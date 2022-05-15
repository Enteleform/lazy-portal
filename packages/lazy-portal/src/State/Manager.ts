//###  Module  ###//
import {Destination        } from "./Destination"
import {Entrance           } from "./Entrance"
import {Transport          } from "./Transport"
import {Error              } from "Error/index"
import {Props              } from "Types/Props"
import {Payload as _Payload} from "Utilities/XState"

//###  NPM  ###//
import {
	createMachine,
	interpret,
	Interpreter,
} from "xstate"


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export namespace Manager{

		export type TransferPayload<Type extends string> =
		& {type:Type}
		& {
			destinationID: string
			entranceID:    string
			mode:          ("Automatic" | "Manual")
		}

		export type  Context = (typeof context)
		export const context = {
			destinations:    (new Map() as EntityMap      <Destination.Service>),
			entranceGroups:  (new Map() as NestedEntityMap<Entrance   .Service>),
			transportGroups: (new Map() as NestedEntityMap<Transport  .Service>),
		}

		export type Payload = _Payload.Map<Event>
		export type Event =
			| {type:"REGISTER_DESTINATION", $:HTMLElement, destinationID:string,                    defaultPosition:Props.Destination["defaultPosition"], transferMode:Props.Destination["transferMode"]}
			| {type:"REGISTER_ENTRANCE",    $:HTMLElement, destinationID:string, entranceID:string, position:       Props.Entrance   ["position"       ],                                               }
			| {type:"REGISTER_TRANSPORT",   $:HTMLElement, destinationID:string, entranceID:string,                                                                                                     }
			//
			| {type:"UNREGISTER_DESTINATION", destinationID:string, unmountMode:Props.Destination["unmountMode"]}
			| {type:"UNREGISTER_ENTRANCE",    destinationID:string, entranceID: string                          }
			| {type:"UNREGISTER_TRANSPORT",   destinationID:string, entranceID: string                          }
			//
			| TransferPayload<"TRANSFER_TO_DESTINATION">
			| TransferPayload<"TRANSFER_TO_ENTRANCE"   >

		export type  Machine = (typeof machine)
		export const machine = createMachine<Context, Event>(

			//----------------------------------------------------------------------------------------------------------------//
			//  Config                                                                                                        //
			//----------------------------------------------------------------------------------------------------------------//
			{

				context,

				id: "Portal-Manager",

				on: {

					//------------------------------------------------------------------------------------------------------------//
					//  Registration                                                                                              //
					//------------------------------------------------------------------------------------------------------------//

						REGISTER_DESTINATION: {actions:((context, {type, $, ...event}) => {
							const {destinations, transportGroups} = context
							const {destinationID                } = event

              //###  Register  ###//

								if(destinations.has(destinationID))
									{throw new Error.Duplicate_DestinationID({destinationID})}

								const service = interpret(Destination.machine.withConfig({}, event))
								service.start()

								destinations.set(destinationID, {service, $:new WeakRef($)})

              //###  Claim  ###//

								const transports = transportGroups.get(destinationID)

								if(transports){
									for(const transport of transports.values())
										{transport.service.send({type:"CLAIM"})}
								}
						})},

						REGISTER_ENTRANCE: {actions:((context, {type, $, ...event}) => {
							const {entranceGroups           } = context
							const {destinationID, entranceID} = event

							if([...entranceGroups.values()].some(group => group.has(entranceID)))
								{throw new Error.Duplicate_EntranceID({entranceID})}

							const service = interpret(Entrance.machine.withConfig({}, event))
							service.start()

							if(!entranceGroups.has(destinationID))
								{entranceGroups.set(destinationID, new Map())}

							const entrances = entranceGroups.get(destinationID)
							entrances.set(entranceID, {service, $:new WeakRef($)})
						})},

						REGISTER_TRANSPORT: {actions:((context, {type, $, ...event}) => {
							const {destinations, transportGroups} = context
							const {destinationID, entranceID    } = event

              //###  Register  ###//

								const service = interpret(Transport.machine.withConfig({}, event))
								service.start()

								if(!transportGroups.has(destinationID))
									{transportGroups.set(destinationID, new Map())}

								const transports = transportGroups.get(destinationID)
								transports.set(entranceID, {service, $:new WeakRef($)})

              //###  Claim  ###//

								const destination = destinations.get(destinationID)

								if(destination?.service)
									{service.send({type:"CLAIM"})}
						})},

						UNREGISTER_DESTINATION: {actions:((context, {type, ...event}) => {
							const {destinations, transportGroups} = context
							const {destinationID                } = event

              //###  Unregister  ###//

								const service = destinations.get(event.destinationID)?.service
								service?.stop()

								destinations.delete(event.destinationID)

              //###  Unclaim  ###//

								const transports = transportGroups.get(destinationID)

								if(transports){
									for(const transport of transports.values()){
										transport.service.send({
											type: ((event.unmountMode === "Persist") ? "UNCLAIM" : "DESTROY")
										})
									}
								}
						})},

						UNREGISTER_ENTRANCE: {actions:(({entranceGroups}, {type, ...event}) => {
							const entrances = entranceGroups.get(event.destinationID)

							const service = entrances.get(event.entranceID)?.service
							service?.stop()

							entrances.delete(event.entranceID)
						})},

						UNREGISTER_TRANSPORT: {actions:(({transportGroups}, {type, ...event}) => {
							const transports = transportGroups.get(event.destinationID)

							const service = transports.get(event.entranceID)?.service
							service?.stop()

							transports.delete(event.entranceID)
						})},


					//------------------------------------------------------------------------------------------------------------//
					//  Transfer                                                                                                  //
					//------------------------------------------------------------------------------------------------------------//

						TRANSFER_TO_DESTINATION: [
							{cond:"can_AutomaticTransfer_To_Destination", actions:"transfer_To_Destination"        },
							{cond:"can_ManualTransfer_To_Destination",    actions:"transfer_To_Destination"        },
							{cond:"has_DestinationOccupied_Error",        actions:"throw_DestinationOccupied_Error"},
						],

						TRANSFER_TO_ENTRANCE: [
							{cond:"can_AutomaticTransfer_To_Entrance", actions:"transfer_To_Entrance"},
							{cond:"can_ManualTransfer_To_Entrance",    actions:"transfer_To_Entrance"},
						],

				},

			},


			//----------------------------------------------------------------------------------------------------------------//
			//  Options                                                                                                       //
			//----------------------------------------------------------------------------------------------------------------//
			{

				actions: {
					transfer_To_Destination(context, event:TransferPayload<any>){
						const {destination, entrance, transport} = get_Services({context, event})
						const $Destination                       = destination.$.deref()
						const $Transport                         = transport  .$.deref()
						const position                           = (entrance.service.state.context.position ?? destination.service.state.context.defaultPosition)

						destination.service.send("TRANSFER_TO_DESTINATION")
						transport  .service.send("TRANSFER_TO_DESTINATION")

						if     (position === "First"                    ){$Destination.prepend($Transport)                                      }
						else if(position === "Last"                     ){$Destination.append ($Transport)                                      }
						else if(position >= $Destination.children.length){$Destination.append ($Transport)                                      }
						else                                             {$Destination.insertBefore($Transport, $Destination.children[position])}
					},

					transfer_To_Entrance(context, event:TransferPayload<any>){
						const {destination, entrance, transport} = get_Services({context, event})

						destination?.service.send("TRANSFER_TO_ENTRANCE")
						transport   .service.send("TRANSFER_TO_ENTRANCE")

						entrance.$.deref().append(transport.$.deref())
					},

					throw_DestinationOccupied_Error(context, event:TransferPayload<any>){
						throw new Error.Destination_Occupied({destinationID:event.destinationID})
					},
				},

				guards: {
					can_AutomaticTransfer_To_Destination(context, event:Payload["TRANSFER_TO_DESTINATION"]){
						const {destination, transport} = get_Services({context, event})

						return (true
							&& (event.mode === "Automatic")
							&& destination?.service.state.matches({Connection:"Connected", Availability:"Open"                                         })
							&& transport  ?.service.state.matches({Claim:"Claimed", Connection:"Connected", Location:"Entrance", Management:"Automatic"})
						)
					},

					can_AutomaticTransfer_To_Entrance(context, event:Payload["TRANSFER_TO_ENTRANCE"]){
						const {transport} = get_Services({context, event})

						return (true
							&& (event.mode === "Automatic")
							&& transport?.service.state.matches({Connection:"Connected", Location:"Destination", Management:"Automatic"})
						)
					},

					can_ManualTransfer_To_Destination(context, event:Payload["TRANSFER_TO_DESTINATION"]){
						const {destination, transport} = get_Services({context, event})

						return (true
							&& (event.mode === "Manual")
							&& destination?.service.state.matches({Connection:"Connected", Availability:"Open"                                      })
							&& transport  ?.service.state.matches({Claim:"Claimed", Connection:"Connected", Location:"Entrance", Management:"Manual"})
						)
					},

					can_ManualTransfer_To_Entrance(context, event:Payload["TRANSFER_TO_ENTRANCE"]){
						const {transport} = get_Services({context, event})

						return (true
							&& (event.mode === "Manual")
							&& transport?.service.state.matches({Claim:"Claimed", Connection:"Connected", Location:"Destination", Management:"Manual"})
						)
					},

					has_DestinationOccupied_Error(context, event:Payload["TRANSFER_TO_DESTINATION"]){
						const {destination, transport} = get_Services({context, event})

						const destination_Is_Closed = destination.service?.state.matches({Connection:"Connected", Availability:"Closed"})

						return (false
							|| (true
								&& (event.mode === "Automatic")
								&& destination
								&& destination_Is_Closed
								&& transport.service?.state.matches({Claim:"Claimed", Connection:"Connected", Location:"Entrance", Management:"Automatic"})
							)
							|| (true
								&& (event.mode === "Manual")
								&& destination
								&& destination_Is_Closed
								&& transport.service?.state.matches({Claim:"Claimed", Connection:"Connected", Location:"Entrance", Management:"Manual"})
							)
						)
					},
				},

			},

		)

	}


//####################################################################################################################//
//##>  Types                                                                                                        ##//
//####################################################################################################################//

	type Entity         <T extends Interpreter<any, any, any, any, any>> = {service:T, $:WeakRef<HTMLElement>}
	type EntityMap      <T extends Interpreter<any, any, any, any, any>> = Map<string, Entity<T>   >
	type NestedEntityMap<T extends Interpreter<any, any, any, any, any>> = Map<string, EntityMap<T>>


//####################################################################################################################//
//##>  Utilities                                                                                                    ##//
//####################################################################################################################//

	function get_Services(
		{context:{destinations, entranceGroups, transportGroups}, event:{entranceID, destinationID} }:
		{context:Manager.Context,                                 event:Manager.TransferPayload<any>}
	){
		const entrances  = entranceGroups .get(destinationID)
		const transports = transportGroups.get(destinationID)

		return {
			entrances,
			transports,
			destination: destinations.get(destinationID),
			entrance:    entrances ?.get(entranceID),
			transport:   transports?.get(entranceID),
		}
	}
