//###  App  ###//
import {Log     } from "Utilities/Log"
import {Selector} from "Utilities/SharedContext"

//###  NPM  ###//
import {createMachine, interpret, assign} from "xstate"


//####################################################################################################################//
//##>  Setup                                                                                                        ##//
//####################################################################################################################//

	type  Context = (typeof context)
	const context = {
		count: 0,
	}

	type Events =
		| {type:"DECREMENT"}
		| {type:"INCREMENT"}

	const machine = createMachine<Context, Events>({
		context,

		on: {
			DECREMENT: {actions:assign({count:({count}) => (count - 1)})},
			INCREMENT: {actions:assign({count:({count}) => (count + 1)})},
		},
	})

	const service = interpret(machine).start()


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export namespace Counter{
		export const count = Selector(service, "count")

		export const decrement = (() => {Log.Update("Counter.XState");  service.send("DECREMENT")})
		export const increment = (() => {Log.Update("Counter.XState");  service.send("INCREMENT")})
	}
