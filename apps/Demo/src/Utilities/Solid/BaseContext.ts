//###  NPM  ###//
import {createContext, useContext} from "solid-js"


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export function BaseContext<
		Args    extends any[],
		Context extends object,
	>(
		{create                            }:
		{create:((...args:Args) => Context)}
	){
		const Context = createContext<Context>()

		return {
			create,
			Provider: Context.Provider,
			use:      (() => useContext(Context)),
		}
	}
