//###  Node  ###//
import * as FS   from "fs"
import * as Path from "path"

//###  NPM  ###//
const {default:{sync:glob}} = (await import("fast-glob"))


//####################################################################################################################//
//##>  Setup                                                                                                        ##//
//####################################################################################################################//

	const templateRoot = Path.resolve(`./Templates/StackBlitz/`)

	const templateFiles =
		glob("**", {
			cwd:      templateRoot,
			absolute: false,
		})


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export async function get_ComponentSource(
		{path:examplePath}:
		{path:string     }
	){
		const exampleRoot = Path.resolve(`./src/${examplePath}`)

		const exampleFiles =
			glob(`**/*`, {
				cwd:      exampleRoot,
				absolute: false,
			})

		ensure_NoDuplicates({exampleFiles})

		const source: Record<string, string> = {}

		const fileGroups = [
			{root:templateRoot, files:templateFiles, folder:"./"    },
			{root:exampleRoot,  files:exampleFiles,  folder:"./src/"},
		] as const

		for(const {files, folder, root} of fileGroups){
			for(const relativePath of files){
				const absolutePath = Path.resolve(root, relativePath)

				const sandboxPath =
					(folder + relativePath)
					.replace(/^\.\//, "")

				source[sandboxPath] = FS.readFileSync(absolutePath, {encoding:"utf8"})
			}
		}

		return {source}
	}


//####################################################################################################################//
//##>  Utilities                                                                                                    ##//
//####################################################################################################################//

	function ensure_NoDuplicates(
		{exampleFiles         }:
		{exampleFiles:string[]}
	){
		const allFiles = [
			...templateFiles,
			...exampleFiles,
		]

		if(allFiles.length !== (new Set(allFiles).size))
			{throw new Error("Duplicate Files Detected.")}
	}
