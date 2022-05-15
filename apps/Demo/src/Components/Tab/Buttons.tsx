/** @jsxImportSource solid-js */

//###  App  ###//
import {BaseProps} from "Utilities/Solid"

//###  NPM  ###//
import clsx from "clsx"


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export type     Buttons = (typeof Buttons)
	export function Buttons(props:Buttons.Props){
		return (
			<div class={clsx("TAB-BUTTONS", props.class)}>
				{props.children}
			</div>
		)
	}

	export namespace Buttons{
		export type Props = BaseProps<{}>
	}
