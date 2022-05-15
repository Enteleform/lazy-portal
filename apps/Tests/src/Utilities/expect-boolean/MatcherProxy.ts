//###  Module  ###//
import type {Expect}   from "./Expect"
import {forward_Error} from "./Utilities"

//###  NPM  ###//
import is_Function from "lodash/isFunction"
import type {
	Expect   as _Expect,
	Matchers as _Matchers,
} from "expect"


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	/**
	* `Expect.<any>` property handler that:
	* - wraps functions, ensuring the return of `boolean` values
	* - wraps nested `Expect.Matchers` with `_MatcherProxy`
	*/
	export class MatcherProxy<T extends (void | Promise<void>)>{
		#matcher: _Matchers<T>
		#options: MatcherProxy.Options

		private constructor(matcher:_Matchers<T>, options:MatcherProxy.Options){
			this.#matcher = matcher
			this.#options = options
		}

		static create<T>(matcher:ReturnType<_Expect>, options:MatcherProxy.Options): BooleanMatchers{
			return new Proxy(
				({} as any),
				new MatcherProxy(matcher, options),
			)
		}

		get(target:any, key:string){
			const value = this.#matcher[key]
			if(is_Function(value))
				{return _get_BooleanMatcherFunction(value, this.#options)}
			else
				{return MatcherProxy.create(value, this.#options)}
		}
	}

	export namespace MatcherProxy{
		export type Options =
			{mode:Expect.Mode}
	}


//####################################################################################################################//
//##>  Types                                                                                                        ##//
//####################################################################################################################//

	type BooleanMatchers<T = ReturnType<_Expect>> =
		| T extends ((...args:any) => Promise<void>) ? ((...args:Parameters<T>) => Promise<boolean>)
		: T extends ((...args:any) => void         ) ? ((...args:Parameters<T>) => boolean         )
		: T extends object                           ? {[K in keyof T]: BooleanMatchers<T[K]>}
		:                                              T


//####################################################################################################################//
//##>  Utilities                                                                                                    ##//
//####################################################################################################################//

	/**
	* Returns a callback that:
	* - returns `false` when an `Expect` exception is thrown
	* - returns `true` otherwise
	*/
	function _get_BooleanMatcherFunction<T extends (void | Promise<void>)>(
		func:    ((...args:any) => _Matchers<T>),
		options: MatcherProxy.Options,
	){
		return function(...args:any){
			let result = true

			try{
				func(...args)
			}
			catch(error){
				forward_Error(error, options.mode)
				result = false
			}

			return result
		}
	}
