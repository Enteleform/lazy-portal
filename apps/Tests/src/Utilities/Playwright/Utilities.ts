//###  Reference  ###//
// https://github.com/tjoskar/playwright-react

//###  Node  ###//
import Path from "path"


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export function get_ParentModule_Path(){
		const stacks   = [...new Set(get_CallSites().map((s) => s.getFileName()))]
		const fileName = stacks[2]

		if(!fileName)
			{throw new Error("Could not get filename of the test.")}

		return Path.dirname(fileName)
	}


//####################################################################################################################//
//##>  Utilities                                                                                                    ##//
//####################################################################################################################//

	function get_CallSites(){
		const _prepareStackTrace = Error.prepareStackTrace
		Error.prepareStackTrace  = ((_, stack) => stack)
		const stack              = new Error().stack!.slice(1)
		Error.prepareStackTrace  = _prepareStackTrace

		return (stack as any as NodeJS.CallSite[])
	}
