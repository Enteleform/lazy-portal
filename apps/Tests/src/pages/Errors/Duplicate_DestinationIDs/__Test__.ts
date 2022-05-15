//###  App  ###//
import {DOM_Environment, expect} from "Utilities/Test/Server/Utilities"

//###  Framework  ###//
import {Portal} from "lazy-portal"


//####################################################################################################################//
//##>  Test                                                                                                         ##//
//####################################################################################################################//

	DOM_Environment.Test({group:"Errors", name:"Duplicate Destination IDs", url:"/Errors/Duplicate_DestinationIDs"}, (async ({dom, page}) => {

		//----------------------------------------------------------------------------------------------------------------//
		//  [Setup] Error Capture                                                                                         //
		//----------------------------------------------------------------------------------------------------------------//

			let duplicate_DestinationID_Error: Error

			page.on("pageerror", ((error) => {
				if(error.name === Portal.Error.Duplicate_DestinationID.ErrorName)
					{duplicate_DestinationID_Error = error}
				else
					{throw error}
			}))

		//----------------------------------------------------------------------------------------------------------------//
		//  [Setup] Create Duplicate Destination                                                                          //
		//----------------------------------------------------------------------------------------------------------------//

			await dom.evaluate(async ({U,V})=>{
				const $ = U.get_Targets()

				const $Destination = U.create_Element_From_HTML(`
					<portal-destination name="Portal"/>
				`)

				$.Container_C__Content.append($Destination)
			})

		//----------------------------------------------------------------------------------------------------------------//
		//  [Assert] Has Error                                                                                            //
		//----------------------------------------------------------------------------------------------------------------//

			expect({duplicate_DestinationID_Error}).toBeTruthyRecord()

	}))
