//###  Module  ###//
import {Manager} from "Runtime/ManagerInstance"

//###  NPM  ###//
import {createMachine, Interpreter} from "xstate"


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export namespace Transport{

		export type Event =
			| {type:"CONNECT"   }
			| {type:"DISCONNECT"}
			//
			| {type:"CLAIM"  }
			| {type:"UNCLAIM"}
			| {type:"DESTROY"}
			//
			| {type:"TRANSFER_TO_DESTINATION"}
			| {type:"TRANSFER_TO_ENTRANCE"   }

		export type Context = {
			entranceID:    string
			destinationID: string
		}

		export type Service = Interpreter<Context, any, Event, any, any>

		export type  Machine = (typeof machine)
		export const machine = createMachine<Context, Event>(

			//--------------------------------------------------------------------------------------------------------------//
			//  Config                                                                                                      //
			//--------------------------------------------------------------------------------------------------------------//
			{

				id:   "Portal.Transport",
				type: "parallel",

				states: {
					Claim: {
						initial: "Unclaimed",
						states: {
							Unclaimed: {
								entry: (({destinationID, entranceID})=>{
									Manager().send({
										type: "TRANSFER_TO_ENTRANCE",
										mode: "Automatic",
										destinationID,
										entranceID,
									})
								}),
								on:{CLAIM:{target:"Claimed"}},
							},
							Claimed: {
								entry: (({destinationID, entranceID})=>{
									Manager().send({
										type: "TRANSFER_TO_DESTINATION",
										mode: "Automatic",
										destinationID,
										entranceID,
									})
								}),
								on:{
									DESTROY: {/* do nothing, unmount events will fire @ component */},
									UNCLAIM: {target:"Unclaimed"},
								},
							},
						},
					},
					Connection: {
						initial: "Connected",
						states: {
							Connected:    {on:{DISCONNECT:{target:"Disconnected"}}},
							Disconnected: {on:{CONNECT:   {target:"Connected"   }}},
						},
					},
					Location: {
						initial: "Entrance",
						states: {
							Entrance:    {on:{TRANSFER_TO_DESTINATION:{target:"Destination"}}},
							Destination: {on:{TRANSFER_TO_ENTRANCE:   {target:"Entrance"   }}},
						},
					},
					Management: {
						initial: "Automatic",
						states: {
							Automatic: {
								/* ToDo */
							},
							Manual: {
								/* ToDo */
							},
						},
					},
				},

			},

		)

	}
