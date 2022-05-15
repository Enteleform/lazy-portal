//###  App  ###//
import {DOM_Environment} from "Utilities/Test/Server/Utilities"


//####################################################################################################################//
//##>  Test                                                                                                         ##//
//####################################################################################################################//

	DOM_Environment.Test({group:"Timing", name:"Delayed Entrance", url:"/Timing/DelayedEntrance"}, (async ({dom}) => {

		//----------------------------------------------------------------------------------------------------------------//
		//  [Assert] Initial State                                                                                        //
		//----------------------------------------------------------------------------------------------------------------//

			await dom.assert(async ({U,V})=>{
				const $ = U.get_Targets()

				return {
					...U.has_Initial_PortalStructure($, {
						Root:      false,
						Entrances: false,
						Entrance:  false,
						Transport: false,
					}),

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

		//----------------------------------------------------------------------------------------------------------------//
		//  [Setup] Create Entrance                                                                                       //
		//----------------------------------------------------------------------------------------------------------------//

			await dom.evaluate(async ({U,V})=>{
				const $ = U.get_Targets()

				const $Entrance = U.create_Element_From_HTML(`
					<portal-entrance to="Portal">
						Portal Content
					</portal-entrance>
				`)

				document.body.append($Entrance)
			})

		//----------------------------------------------------------------------------------------------------------------//
		//  [Assert] Final State                                                                                          //
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
