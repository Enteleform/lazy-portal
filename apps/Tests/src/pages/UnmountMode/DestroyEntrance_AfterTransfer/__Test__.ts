//###  App  ###//
import {DOM_Environment} from "Utilities/Test/Server/Utilities"


//####################################################################################################################//
//##>  Test                                                                                                         ##//
//####################################################################################################################//

	DOM_Environment.Test({group:"UnmountMode", name:"Destroy Entrance After Transfer", url:"/UnmountMode/DestroyEntrance_AfterTransfer"}, (async ({dom}) => {

		//----------------------------------------------------------------------------------------------------------------//
		//  [Setup] Destroy Entrance                                                                                      //
		//----------------------------------------------------------------------------------------------------------------//

			await dom.evaluate(async ({U,V})=>{
				const $ = U.get_Targets()
				$.PortalEntrance.remove()
			})

		//----------------------------------------------------------------------------------------------------------------//
		//  [Assert] Final State                                                                                          //
		//----------------------------------------------------------------------------------------------------------------//

			await dom.assert(async ({U,V})=>{
				const $ = U.get_Targets()

				return {
					...U.exists($, {
						Entrance:    false,
						Transport:   true,
						Destination: true,
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
