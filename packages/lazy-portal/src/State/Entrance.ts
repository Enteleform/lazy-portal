//###  Module  ###//
import {Props as _Props} from "../Types/Props"

//###  NPM  ###//
import {createMachine, Interpreter} from "xstate"


//####################################################################################################################//
//##>  Aliases                                                                                                      ##//
//####################################################################################################################//

	import Props = _Props.Entrance


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export namespace Entrance{

		export type Event =
			| {type:"CONNECT"   }
			| {type:"DISCONNECT"}

		export type Context = {
			entranceID:    string
			destinationID: string
			position:      Props["position"]
		}

		export type Service = Interpreter<Context, any, Event, any, any>

		export type  Machine = (typeof machine)
		export const machine = createMachine<Context, Event>(

			//--------------------------------------------------------------------------------------------------------------//
			//  Config                                                                                                      //
			//--------------------------------------------------------------------------------------------------------------//
			{

				id:   "Portal.Entrance",
				type: "parallel",

				states: {
					Connection: {
						initial: "Connected",
						states: {
							Connected:    {on:{DISCONNECT:{target:"Disconnected"}}},
							Disconnected: {on:{CONNECT:   {target:"Connected"   }}},
						},
					},
				},

			},

		)

	}
