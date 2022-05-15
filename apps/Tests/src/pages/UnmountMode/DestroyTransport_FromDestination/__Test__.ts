//###  App  ###//
import {DOM_Environment} from "Utilities/Test/Server/Utilities"


//####################################################################################################################//
//##>  Test                                                                                                         ##//
//####################################################################################################################//

	DOM_Environment.Test({group:"UnmountMode", name:"Destroy Transport From Destinationn", url:"/UnmountMode/DestroyTransport_FromDestination"}, (async ({dom}) => {

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
						Transport:   false,
						Destination: false,
					}),
				}
			})

	}))
