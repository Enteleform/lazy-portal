//###  App  ###//
import {DOM_Environment} from "Utilities/Test/Server/Utilities"


//####################################################################################################################//
//##>  Test                                                                                                         ##//
//####################################################################################################################//

	DOM_Environment.Test({group:"UnmountMode", name:"Persist Transport From Destination", url:"/UnmountMode/PersistTransport_FromDestination"}, (async ({dom}) => {

		//----------------------------------------------------------------------------------------------------------------//
		//  [Setup] Destroy Destination                                                                                   //
		//----------------------------------------------------------------------------------------------------------------//

			await dom.evaluate(async ({U,V})=>{
				const $ = U.get_Targets()
				$.PortalDestination.remove()
			})

		//----------------------------------------------------------------------------------------------------------------//
		//  [Assert] Final State                                                                                          //
		//----------------------------------------------------------------------------------------------------------------//

			await dom.assert(async ({U,V})=>{
				const $ = U.get_Targets()

				return {
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

	}))
