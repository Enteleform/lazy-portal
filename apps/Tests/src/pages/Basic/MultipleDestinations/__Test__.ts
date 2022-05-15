//###  App  ###//
import {DOM_Environment} from "Utilities/Test/Server/Utilities"


//####################################################################################################################//
//##>  Test                                                                                                         ##//
//####################################################################################################################//

	DOM_Environment.Test({group:"Basic", name:"Multiple Destinations", url:"/Basic/MultipleDestinations"}, (async ({dom}) => {

		//----------------------------------------------------------------------------------------------------------------//
		//  [Assert] Initial State                                                                                        //
		//----------------------------------------------------------------------------------------------------------------//

			await dom.assert(async ({U,V})=>{
				const $ = U.get_Targets()

				return {
					"Container_B Has Correct Contents": U.expect(  $.Container_B?.querySelector("portal-transport").textContent.trim()  ).toEqual(  `${V.PortalContent} 1`  ),
					"Container_C Has Correct Contents": U.expect(  $.Container_C?.querySelector("portal-transport").textContent.trim()  ).toEqual(  `${V.PortalContent} 2`  ),

					...U.has_Initial_PortalStructure($, {
						Root:      true,
						Entrances: true,
						Entrance:  true,
						Transport: true,
					}),

					...U.exists($, {
						Entrance:    true,
						Transport:   true,
						Destination: true,
					}),

					...U.has_Transport($, {
						Entrance:    false,
						Destination: true,
						Container_A: false,
						Container_B: true,
						Container_C: true,
					}),
				}
			})

	}))
