/** @jsxImportSource solid-js */

//###  App  ###//
import {BaseProps} from "Utilities/Solid"

//###  NPM  ###//
import clsx from "clsx"


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export type     Panels = (typeof Panels)
	export function Panels(props:Panels.Props){
		return (
			<div class={clsx("TAB-PANELS", props.class)}>
				{props.children}
			</div>
		)
	}

	export namespace Panels{
		export type Props = BaseProps<{}>
	}
