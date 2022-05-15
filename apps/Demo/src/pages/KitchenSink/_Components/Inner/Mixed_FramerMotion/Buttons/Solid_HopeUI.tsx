/** @jsxImportSource solid-js */

//###  Reference  ###//
// https://hope-ui.com/docs/general/button

//###  App  ###//
import {Log            } from "Utilities/Log"
import {ShowWhenVisible} from "Utilities/Solid"

//###  NPM  ###//
import {Button, HopeProvider} from "@hope-ui/solid"


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export function Solid_HopeUI(){
		return (
			<ShowWhenVisible>
				<HopeProvider config={{initialColorMode:"dark"}} enableCssReset={false}>

					<Button
						className = "BUTTON"
						onClick = {()=>{
							Log.Update("Solid.HopeUI")
						}}
					>
						<div className="Framework"> [Solid] </div>
						<div className="Library"  > Hope UI </div>
					</Button>

				</HopeProvider>
			</ShowWhenVisible>
		)
	}
