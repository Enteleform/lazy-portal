/** @jsxImportSource react */

//###  Reference  ###//
// https://mui.com/components/buttons/#color

//###  App  ###//
import {Log} from "Utilities/Log"

//###  NPM  ###//
import Button from "@mui/material/Button"


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export function React_MUI(){
		return (
			<Button
				className = "BUTTON"
				variant   = "contained"
				onClick = {()=>{
					Log.Update("React.MUI")
				}}
			>
				<div className="Framework"> [React]   </div>
				<div className="Library"  > MUI       </div>
			</Button>
		)
	}
