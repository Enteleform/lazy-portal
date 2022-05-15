//###  Reference  ###//
// https://github.com/tjoskar/playwright-react

//###  Module  ###//
import {Json                 } from "../Json"
import {UniqueID             } from "../UniqueID"
import {get_ParentModule_Path} from "./Utilities"

//###  NPM  ###//
import {NodeGlobalsPolyfillPlugin as ESBuild_Polyfill_NodeGlobals} from "@esbuild-plugins/node-globals-polyfill"
import {NodeModulesPolyfillPlugin as ESBuild_Polyfill_NodeModules} from "@esbuild-plugins/node-modules-polyfill"
import {expect, ElementHandle, Page, test                        } from "@playwright/test"
import {build                                                    } from "esbuild"


//####################################################################################################################//
//##>  Aliases                                                                                                      ##//
//####################################################################################################################//

	type InternalPage =
		& Page
		& {_guid:string}

	type TestParameters =
		Parameters<
			Parameters<typeof test>[1]
		>[0]


//####################################################################################################################//
//##>  Setup                                                                                                        ##//
//####################################################################################################################//

	const LoadedPages = new Map<
		string, // page._guid
		string  // page.url
	>()


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export function create_DOM_Environment
		<Imports extends ImportMap>
		(imports:Imports)
	{
		type Modules =
			{[K in keyof Imports]: Awaited<ReturnType<Imports[K]>>}

		/* type mock for `page.evaluate` */
		let __DOM_MODULE_LOADER__MODULES: Modules

		type DOM = {
			assert:   <ReturnValue extends Record<string, boolean>>(callback: (modules: Modules) => Promise<ReturnValue>) => Promise<void>
			evaluate: <ReturnValue extends void | Json.Value<Node>>(callback: (modules: Modules) => Promise<ReturnValue>) => Promise<DOM_ReturnValue<ReturnValue>>
		}

		type TestCallback =
			((
				{page,      dom    }:
				{page:Page, dom:DOM}
			) => Promise<void>)

		let moduleScript: string

		return {
			Test(
				{group, name, url}: TestData,
				callback:           TestCallback,
			){
				test.describe(group, (()=>{

					const evaluate = ((page:Page) => <DOM["evaluate"]>(async (callback) => {
						moduleScript ??= await build_ModuleScript({imports})
						await ensure_ModulesLoaded({moduleScript, page})

						const callbackID = `__DOM_MODULE_LOADER__EVALUATE_${UniqueID()}`

						await page.addScriptTag({
							content:`
								async function ${callbackID}(__DOM_MODULE_LOADER__MODULES){
									return (${callback.toString()})(__DOM_MODULE_LOADER__MODULES)
								}
							`,
						})

						return await page.evaluate(async ({callbackID})=>{
							await (window as any).setup()
							return await (window as any)[callbackID](__DOM_MODULE_LOADER__MODULES)
						}, {callbackID})
					}))

					const assert = ((page:Page) => <DOM["assert"]>(async (callback) => {
						const result = await evaluate(page)(callback)
						expect(result).toBeTruthyRecord()
					}))

					test(name, (async ({page}) => {
						if(url)
							{await page.goto(url)}

						await callback({
							page,
							dom: {
								assert:   assert  (page),
								evaluate: evaluate(page),
							},
						})
					}))

				}))
			},
		}
	}


//####################################################################################################################//
//##>  Types                                                                                                        ##//
//####################################################################################################################//

	type TestData = {
		group: string
		name:  string
		url?:  string
	}

	type ImportMap =
		Record<string, (() => Promise<object>)>

	type DOM_ReturnValue<
		ReturnValue,
		Depth extends number[] = [0, 1, 2, 3, 4, 5],
	> =
		| ReturnValue extends Json.Value<null>   ? ReturnValue
		: ReturnValue extends Node               ? ElementHandle
		: ReturnValue extends (Node | infer T)[] ? (ElementHandle | T)[]
		: ReturnValue extends object
			? Depth extends [infer First, ...infer Last]
			? Last extends number[]
				? {[K in keyof ReturnValue]: DOM_ReturnValue<ReturnValue[K], Last>}
				: object
			: object
		: ReturnValue


//####################################################################################################################//
//##>  Utilities                                                                                                    ##//
//####################################################################################################################//

	async function ensure_ModulesLoaded(
		{moduleScript,        page     }:
		{moduleScript:string, page:Page}
	){
		const [id, url] = [(page as InternalPage)._guid, page.url()]

		if(!LoadedPages.has(id)){
			page.addListener("load", ()=>{
				LoadedPages.set(id, null)
			})
		}

		if(LoadedPages.get(id) === url)
			{return}
		else{
			LoadedPages.set(id, url)
			await page.addScriptTag({content:moduleScript})
		}
	}

	async function build_ModuleScript(
		{imports          }:
		{imports:ImportMap}
	){
		const moduleAssignments =
			Object.entries(imports)
				.map(([key, moduleImport]) => `__DOM_MODULE_LOADER__MODULES.${key} = await (${moduleImport})()`)
				.join("\n")

		const buildResult = await build({
			bundle: true,
			write:  false,
			watch:  false,
			plugins: [
				ESBuild_Polyfill_NodeGlobals(),
				ESBuild_Polyfill_NodeModules(),
			],
			stdin: {
				resolveDir: get_ParentModule_Path(),
				loader:     "ts",
				contents: `
					window.setup = async function setup(){
						if(!window._interopRequireWildcard)
							{window._interopRequireWildcard = ((i) => i)}

						process.stdout ??= {}

						window.__DOM_MODULE_LOADER__MODULES = {}

						${moduleAssignments}
					}
				`,
			},
		})

		return buildResult.outputFiles[0].text
	}
