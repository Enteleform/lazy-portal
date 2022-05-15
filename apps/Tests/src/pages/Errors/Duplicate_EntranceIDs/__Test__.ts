//###  App  ###//
import {DOM_Environment, expect} from "Utilities/Test/Server/Utilities"

//###  Framework  ###//
import {Portal} from "lazy-portal"


//####################################################################################################################//
//##>  Test                                                                                                         ##//
//####################################################################################################################//

	DOM_Environment.Test({group:"Errors", name:"Duplicate Entrance IDs", url:"/Errors/Duplicate_EntranceIDs"}, (async ({dom, page}) => {

		//----------------------------------------------------------------------------------------------------------------//
		//  [Setup] Error Capture                                                                                         //
		//----------------------------------------------------------------------------------------------------------------//

			let duplicate_EntranceID_Error: Error

			page.on("pageerror", ((error) => {
				if(error.name === Portal.Error.Duplicate_EntranceID.ErrorName)
					{duplicate_EntranceID_Error = error}
				else
					{throw error}
			}))

		//----------------------------------------------------------------------------------------------------------------//
		//  [Setup] Create Duplicate Entrance                                                                          //
		//----------------------------------------------------------------------------------------------------------------//

			await dom.evaluate(async ({U,V})=>{
				const $ = U.get_Targets()

				const $Entrance = U.create_Element_From_HTML(`
					<portal-entrance to="Portal">
						Portal Content 2
					</portal-entrance>
				`)

				$.Container_C__Content.append($Entrance)
			})

		//----------------------------------------------------------------------------------------------------------------//
		//  [Assert] Has Error                                                                                            //
		//----------------------------------------------------------------------------------------------------------------//

			expect({duplicate_EntranceID_Error}).toBeTruthyRecord()

	}))
