//###  App  ###//
import {create_DOM_Environment} from "Utilities/Playwright"

//###  Framework  ###//
import {expect as _expect} from "Utilities/expect-boolean"


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export * from "../Common/Utilities"

	export const expect = _expect.error

	export const DOM_Environment = create_DOM_Environment({
		U: (() => import("Utilities/Test/Client/Utilities")),
		V: (() => import("Utilities/Test/Client/Values"   )),
	})

	export function BasicTest(
		{group,        name,        url       }:
		{group:string, name:string, url:string}
	){
		DOM_Environment.Test({group, name, url}, (async ({dom}) => {

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
	}
