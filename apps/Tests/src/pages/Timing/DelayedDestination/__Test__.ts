//###  App  ###//
import {DOM_Environment} from "Utilities/Test/Server/Utilities"


//####################################################################################################################//
//##>  Test                                                                                                         ##//
//####################################################################################################################//

	DOM_Environment.Test({group:"Timing", name:"Delayed Destination", url:"/Timing/DelayedDestination"}, (async ({dom}) => {

		//----------------------------------------------------------------------------------------------------------------//
		//  [Assert] Initial State                                                                                        //
		//----------------------------------------------------------------------------------------------------------------//

			await dom.assert(async ({U,V})=>{
				const $ = U.get_Targets()

				return {
					...U.has_Initial_PortalStructure($, {
						Root:      true,
						Entrances: true,
						Entrance:  true,
						Transport: true,
					}),

					...U.exists($, {
						Entrance:    true,
						Transport:   true,
						Destination: false,
					}),

					...U.has_Transport($, {
						Entrance:    true,
						Destination: false,
						Container_A: false,
						Container_B: false,
						Container_C: false,
					}),
				}
			})

		//----------------------------------------------------------------------------------------------------------------//
		//  [Setup] Create Destination                                                                                    //
		//----------------------------------------------------------------------------------------------------------------//

			await dom.evaluate(async ({U,V})=>{
				const $ = U.get_Targets()

				const $Destination = U.create_Element_From_HTML(`
					<portal-destination name="Portal"/>
				`)

				$.Container_B__Content.append($Destination)
			})

		//----------------------------------------------------------------------------------------------------------------//
		//  [Assert] Final State                                                                                          //
		//----------------------------------------------------------------------------------------------------------------//

			await dom.assert(async ({U,V})=>{
				const $ = U.get_Targets()

				return {
					"PortalDestination Has Slot": U.expect(  $.PortalDestination?.shadowRoot.querySelector("slot")  ).toBeTruthy(),

					...U.exists($, {
						Entrance:    true,
						Transport:   true,
						Destination: true,
					}),

					...U.has_PortalContents($, {
						Entrance:    false,
						Destination: true,
						Transport:   true,
					}),

					...U.has_Transport($, {
						Entrance:    false,
						Destination: true,
						Container_A: false,
						Container_B: true,
						Container_C: false,
					}),
				}
			})

	}))
