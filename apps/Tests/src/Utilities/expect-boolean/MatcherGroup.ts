//###  Module  ###//
import {Expect       } from "./Expect"
import {forward_Error} from "./Utilities"


//####################################################################################################################//
//##>  Aliases                                                                                                      ##//
//####################################################################################################################//

	const ErrorMatchers = Expect.get_Error_Matchers


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export namespace MatcherGroup{

		export namespace Default{
			export const All  = _All ("Default")
			export const Some = _Some("Default")
		}

		export namespace Silent{
			export const All  = _All ("Silent")
			export const Some = _Some("Silent")
		}

		export namespace Warn{
			export const All  = _All ("Warn")
			export const Some = _Some("Warn")
		}

		export namespace Error{
			export const All  = _All ("Error")
			export const Some = _Some("Error")
		}

	}

	/* TODO: restore when namespace bug fixed @ Playwright */

	//export namespace MatcherGroup.Default{
	//	export const All  = _All ("Default")
	//	export const Some = _Some("Default")
	//}

	//export namespace MatcherGroup.Silent{
	//	export const All  = _All ("Silent")
	//	export const Some = _Some("Silent")
	//}

	//export namespace MatcherGroup.Warn{
	//	export const All  = _All ("Warn")
	//	export const Some = _Some("Warn")
	//}

	//export namespace MatcherGroup.Error{
	//	export const All  = _All ("Error")
	//	export const Some = _Some("Error")
	//}


//####################################################################################################################//
//##>  Types                                                                                                        ##//
//####################################################################################################################//

	type MatcherCallback =
		(() => boolean)

	type MatcherGroup_Callback =
		((expect:Expect) => MatcherCallback[])

	type Conflict = {
		index:  number
		result: boolean
		error?: Error
	}


//####################################################################################################################//
//##>  Core.All                                                                                                     ##//
//####################################################################################################################//

	function _All(mode:Expect.Mode){
		return {
			toFail(callback:MatcherGroup_Callback){
				const conflicts: Conflict[] = []

				let i = -1
				for(const func of callback(ErrorMatchers)){
					i += 1

					try{
						if(!func())
							{continue}
						else
							{conflicts.push({index:i, result:true})}
					}
					catch(error)
						{continue}
				}

				if(conflicts.length > 0){
					forward_Error(new Error(`Expected all matcher callbacks to fail.\n${ConflictOutput(conflicts)}`), mode)
					return false
				}
				else
					{return true}
			},

			toPass(callback:MatcherGroup_Callback){
				const conflicts: Conflict[] = []

				let i = -1
				for(const func of callback(ErrorMatchers)){
					i += 1

					try{
						if(!func())
							{conflicts.push({index:i, result:false})}
					}
					catch(error)
						{conflicts.push({index:i, result:false, error})}
				}

				if(conflicts.length > 0){
					forward_Error(new Error(`Expected all matcher callbacks to pass.\n${ConflictOutput(conflicts)}`), mode)
					return false
				}
				else
					{return true}
			},
		}
	}


//####################################################################################################################//
//##>  Core.Some                                                                                                    ##//
//####################################################################################################################//

	export function _Some(mode:Expect.Mode){
		return {
			toFail(callback:MatcherGroup_Callback){
				let hasFail = false

				for(const func of callback(ErrorMatchers)){
					try{
						if(!func()){
							hasFail = true
							break
						}
					}
					catch(error){
						hasFail = true
						break
					}
				}

				if(!hasFail){
					forward_Error(new Error("Expected at least one matcher callback to fail. All callbacks passed."), mode)
					return false
				}
				else
					{return true}
			},

			toPass(callback:MatcherGroup_Callback){
				let hasPass = false

				for(const func of callback(ErrorMatchers)){
					try{
						if(func()){
							hasPass = true
							break
						}
					}
					catch(error)
						{continue}
				}

				if(!hasPass){
					forward_Error(new Error("Expected at least one matcher callback to pass. All callbacks failed."), mode)
					return false
				}
				else
					{return false}
			},
		}
	}


//####################################################################################################################//
//##>  Utilities                                                                                                    ##//
//####################################################################################################################//

	function ConflictOutput(conflicts:Conflict[])
		{return `Conflicts: ${JSON.stringify(conflicts, null, 2)}`}
