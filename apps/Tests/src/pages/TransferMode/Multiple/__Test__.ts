//###  App  ###//
import {DOM_Environment} from "Utilities/Test/Server/Utilities"


//####################################################################################################################//
//##>  Test                                                                                                         ##//
//####################################################################################################################//

	DOM_Environment.Test({group:"TransferMode", name:"Multiple", url:"/TransferMode/Multiple"}, (async ({dom}) => {

		//----------------------------------------------------------------------------------------------------------------//
		//  [Assert] Initial State                                                                                        //
		//----------------------------------------------------------------------------------------------------------------//

			await dom.assert(async ({U,V})=>{
				const $ = U.get_Targets()

				return {
					"Destination Has Correct Contents [1]": U.expect(  $.PortalDestination?.querySelector("portal-transport:nth-child(1)")?.textContent.trim()  ).toEqual(  `${V.PortalContent} 1`  ),
					"Destination Has Correct Contents [2]": U.expect(  $.PortalDestination?.querySelector("portal-transport:nth-child(2)")?.textContent.trim()  ).toEqual(  `${V.PortalContent} 2`  ),
				}
			})

	}))
