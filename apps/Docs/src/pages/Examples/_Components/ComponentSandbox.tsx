/** @jsxImportSource solid-js */

//###  NPM  ###//
import {createSignal} from "solid-js"
import {Rerun       } from "@solid-primitives/keyed"
import StackBlitz     from "@stackblitz/sdk"


//####################################################################################################################//
//##>  Exports.Function                                                                                             ##//
//####################################################################################################################//

	export function ComponentSandbox(props:ComponentSandbox.Props){
		const [renderCount, set_RenderCount] = createSignal(0)

		const baseURL      = window.location.pathname
		const componentURL = baseURL.replace(/Examples\//, "Examples-Component/")

		function reload_IFrame()
			{set_RenderCount(renderCount() + 1)}

		function open_StackBlitz(){
			StackBlitz.openProject(
        //###  Project  ###//
				{
					files:       props.source,
					title:       baseURL,
					description: "",
					template:    "node",
				},
				//###  Options  ###//
				{
					openFile:  ["src/pages/index.astro"],
					newWindow: true,
				},
			)
		}

		return (
			<div class="ComponentSandbox">

				<div class="Buttons">
					<button onClick={reload_IFrame}>{
						"Reload"
					}</button>
					<button onClick={open_StackBlitz}>{
						"Open"
					}</button>
				</div>

				<Rerun on={renderCount()}>
					<iframe src={componentURL}/>
				</Rerun>

			</div>
		)
	}


//####################################################################################################################//
//##>  Exports.Namespace                                                                                            ##//
//####################################################################################################################//

	export namespace ComponentSandbox{
		export type Props = {
			source: Record<string, string>
		}
	}
