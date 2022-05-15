//###  App  ###//
import {DOM_Environment, expect} from "Utilities/Test/Server/Utilities"

//###  Framework  ###//
import {Portal} from "lazy-portal"


//####################################################################################################################//
//##>  Test                                                                                                         ##//
//####################################################################################################################//

	DOM_Environment.Test({group:"TransferMode", name:"Single", url:"/TransferMode/Single"}, (async ({dom, page}) => {

		//----------------------------------------------------------------------------------------------------------------//
		//  [Setup] Error Capture                                                                                         //
		//----------------------------------------------------------------------------------------------------------------//

			let destinationOccupied_Error: Error

			page.on("pageerror", ((error) => {
				if(error.name === Portal.Error.Destination_Occupied.ErrorName)
					{destinationOccupied_Error = error}
				else
					{throw error}
			}))

		//----------------------------------------------------------------------------------------------------------------//
		//  [Setup] Create Additional Entrance                                                                            //
		//----------------------------------------------------------------------------------------------------------------//

			await dom.evaluate(async ({U,V})=>{
				const $ = U.get_Targets()

				const $Entrance = U.create_Element_From_HTML(`
					<portal-entrance to="Portal" name="Entrance-2">
						Portal Content 2
					</portal-entrance>
				`)

				document.body.append($Entrance)
			})

		//----------------------------------------------------------------------------------------------------------------//
		//  [Assert] Has Error                                                                                            //
		//----------------------------------------------------------------------------------------------------------------//

			expect({destinationOccupied_Error}).toBeTruthyRecord()

	}))
