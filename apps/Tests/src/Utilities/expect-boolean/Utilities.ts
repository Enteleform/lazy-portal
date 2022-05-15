
//###  Module  ###//
import type {Expect} from "./Expect"
import {State}       from "./State"


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export function forward_Error(error:Error, mode:Expect.Mode){
		if(mode === "Default")
			{mode = State.defaultMode}

		if(mode === "Error")
			{throw error}
		else if(mode === "Warn")
			{console.warn(error)}
	}
