//###  Module  ###//
import {Props as _Props} from "../Types/Props"

//###  NPM  ###//
import {createMachine, Interpreter} from "xstate"


//####################################################################################################################//
//##>  Aliases                                                                                                      ##//
//####################################################################################################################//

	import Props = _Props.Destination


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export namespace Destination{

		export type Event =
			| {type:"CONNECT"                }
			| {type:"DISCONNECT"             }
			| {type:"TRANSFER_TO_DESTINATION"}
			| {type:"TRANSFER_TO_ENTRANCE"   }

		export type Context = {
			destinationID:   string
			transferMode:    Props["transferMode"   ]
			defaultPosition: Props["defaultPosition"]
		}

		export type Service = Interpreter<Context, any, Event, any, any>

		export type  Machine = (typeof machine)
		export const machine = createMachine<Context, Event>(

			//--------------------------------------------------------------------------------------------------------------//
			//  Config                                                                                                      //
			//--------------------------------------------------------------------------------------------------------------//
			{

				id:   "Portal.Destination",
				type: "parallel",

				states: {
					Connection: {
						initial: "Connected",
						states: {
							Connected:    {on:{DISCONNECT:{target:"Disconnected"}}},
							Disconnected: {on:{CONNECT:   {target:"Connected"   }}},
						},
					},
					Availability: {
						initial: "Open",
						states: {
							Open:   {on:{TRANSFER_TO_DESTINATION: {cond:"transferMode_Is_Single", target:"Closed"}}},
							Closed: {on:{TRANSFER_TO_ENTRANCE:    {cond:"transferMode_Is_Single", target:"Open"  }}},
						},
					},
				},

			},

			//--------------------------------------------------------------------------------------------------------------//
			//  Options                                                                                                     //
			//--------------------------------------------------------------------------------------------------------------//
			{

				guards: {
					transferMode_Is_Single: (({transferMode}) => (transferMode === "Single")),
				},

			},

		)

	}
