//###  Module  ###//
import {Expect       } from "./Expect"
import {State        } from "./State"
import {MatcherGroup } from "./MatcherGroup"
import {forward_Error} from "./Utilities"


//####################################################################################################################//
//##>  Initialize Extensions                                                                                        ##//
//####################################################################################################################//

	import "./Extensions"


//####################################################################################################################//
//##>  Exports.Namespace.Core                                                                                       ##//
//####################################################################################################################//

	/**
	* Returns an `Expect.Matchers` instance with functions that return `boolean` values.
	*
	* Handles errors with the default `mode`.
	*/
	export function expect<T>(value:T)
		{return Expect.get_Default_Matchers(value)}

	export namespace expect{
		export import Mode = Expect.Mode

		/**
		* Returns an `Expect.Matchers` instance with functions that return `boolean` values.
		*
		* Ignores errors.
		*/
		export function silent<T>(value:T)
			{return Expect.get_Silent_Matchers(value)}

		/**
		* Returns an `Expect.Matchers` instance with functions that return `boolean` values.
		*
		* Logs errors with `console.warn`.
		*/
		export function warn<T>(value:T)
			{return Expect.get_Warn_Matchers(value)}

		/**
		* Returns an `Expect.Matchers` instance with functions that return `boolean` values.
		*
		* Throws errors.
		*/
		export function error<T>(value:T)
			{return Expect.get_Error_Matchers(value)}
	}


//####################################################################################################################//
//##>  Exports.Utilities                                                                                            ##//
//####################################################################################################################//

	export namespace expect{
		/** Sets the default `mode`to be used by `expect`. */
		export function set_DefaultMode(mode:Mode)
			{State.defaultMode = mode}

		/**Handles errors with the default `mode`. */
		export function forward(error:Error)
			{forward_Error(error, State.defaultMode)}
	}


//####################################################################################################################//
//##>  Exports.Namespace.MatcherGroup                                                                               ##//
//####################################################################################################################//

	export namespace expect{
		export import all  = MatcherGroup.Default.All
		export import some = MatcherGroup.Default.Some

		export namespace silent{
			export import all  = MatcherGroup.Silent.All
			export import some = MatcherGroup.Silent.Some
		}

		export namespace warn{
			export import all  = MatcherGroup.Warn.All
			export import some = MatcherGroup.Warn.Some
		}

		export namespace error{
			export import all  = MatcherGroup.Error.All
			export import some = MatcherGroup.Error.Some
		}
	}

	/* TODO: restore when namespace bug fixed @ Playwright */

	//export namespace expect.silent{
	//	export import all  = MatcherGroup.Silent.All
	//	export import some = MatcherGroup.Silent.Some
	//}

	//export namespace expect.warn{
	//	export import all  = MatcherGroup.Warn.All
	//	export import some = MatcherGroup.Warn.Some
	//}

	//export namespace expect.error{
	//	export import all  = MatcherGroup.Error.All
	//	export import some = MatcherGroup.Error.Some
	//}
