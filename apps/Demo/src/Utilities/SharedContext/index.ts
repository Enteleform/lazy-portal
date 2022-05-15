//###  NPM  ###//
import {useSelector}      from "@xstate/svelte"
import type {Interpreter} from "xstate"
import type {Readable   } from "svelte/store"


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export function Selector<
		Service  extends Interpreter<any>,
		Selector extends (SelectorKey<Service> | SelectorFunction<Service>),
	>(
		service:  Service,
		selector: Selector,
	):
		Readable<
			| Selector extends SelectorKey     <Service> ? Service["state"]["context"][Selector]
			: Selector extends SelectorFunction<Service> ? ReturnType<Selector>
			:                                              never
		>
	{
		return (
			(typeof selector === "string")
			? useSelector(service, ((state) => state.context[selector])   )
			: useSelector(service, (selector as SelectorFunction<Service>))
		)
	}


//####################################################################################################################//
//##>  Types                                                                                                        ##//
//####################################################################################################################//

	type SelectorKey<
		Service extends Interpreter<any>
	> =
		(keyof Service["state"]["context"])

	type SelectorFunction<
		Service extends Interpreter<any>
	> =
		 ((state:Service["state"]) => any)
