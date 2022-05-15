//###  Node  ###//
import Path from "path"

//###  NPM  ###//
const {default:{sync:glob}} = (await import("fast-glob"))


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export function get_Examples_StaticPaths(){
		const examples = get_ExampleNames()

		return (
			examples.map((Example) => ({
				params: {Example},
			}))
		)
	}

	export function get_Path_From_MockURL(mockURL:URL){
		const relativePath =
			mockURL.pathname
			.replace("http://example.com/", ""  )
			.replace(/^\/@fs\//,            ""  )
			.replace(/^[\\\/]/,             "./")

		return Path.resolve(relativePath)
	}


//####################################################################################################################//
//##>  Utilities                                                                                                    ##//
//####################################################################################################################//

	function get_ExampleNames(){
		return (
			glob("*", {
				cwd:             "./src/Examples/",
				absolute:        false,
				onlyDirectories: true,
				markDirectories: false,
			})
		)
	}
