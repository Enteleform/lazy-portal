//###  Module  ###//
import {MatcherProxy} from "./MatcherProxy"

//###  NPM  ###//
import {expect as _expect} from "expect"


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export type Expect = (typeof Expect.get_Default_Matchers)

	export namespace Expect{
		export type Mode =
			| "Default"
			| "Silent"
			| "Warn"
			| "Error"

		export function get_Default_Matchers<T>(value:T){return expect(value, {mode:"Default"})}
		export function get_Silent_Matchers <T>(value:T){return expect(value, {mode:"Silent" })}
		export function get_Warn_Matchers   <T>(value:T){return expect(value, {mode:"Warn"   })}
		export function get_Error_Matchers  <T>(value:T){return expect(value, {mode:"Error"  })}
	}


//####################################################################################################################//
//##>  Utilities                                                                                                    ##//
//####################################################################################################################//

	export function expect<T>(value:T, options:MatcherProxy.Options){
		const matcher = _expect(value)
		return MatcherProxy.create(matcher, options)
	}
