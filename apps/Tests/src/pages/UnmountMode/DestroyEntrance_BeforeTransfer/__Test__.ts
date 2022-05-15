//###  App  ###//
import {DOM_Environment} from "Utilities/Test/Server/Utilities"


//####################################################################################################################//
//##>  Test                                                                                                         ##//
//####################################################################################################################//

	DOM_Environment.Test({group:"UnmountMode", name:"Destroy Entrance Before Transfer", url:"/UnmountMode/DestroyEntrance_BeforeTransfer"}, (async ({dom}) => {

		//----------------------------------------------------------------------------------------------------------------//
		//  [Setup] Destroy Entrance                                                                                      //
		//----------------------------------------------------------------------------------------------------------------//

			await dom.evaluate(async ({U,V})=>{
				const $ = U.get_Targets()
				$.PortalEntrance.remove()
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
					...U.exists($, {
						Entrance:    false,
						Transport:   false,
						Destination: true,
					}),

					...U.has_Transport($, {
						Entrance:    false,
						Destination: false,
						Container_A: false,
						Container_B: false,
						Container_C: false,
					}),
				}
			})

	}))
