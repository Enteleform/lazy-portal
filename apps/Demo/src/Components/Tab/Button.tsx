/** @jsxImportSource solid-js */

//###  App  ###//
import {Context  } from "./Context"
import {BaseProps} from "Utilities/Solid"

//###  NPM  ###//
import clsx                 from "clsx"
import {onCleanup, onMount} from "solid-js"


//####################################################################################################################//
//##>  Exports.Component                                                                                            ##//
//####################################################################################################################//

	export type     Button = (typeof Button)
	export function Button(props:Button.Props){

    //#############//
    //##  Setup  ##//
    //#############//

			const tabID = props.tabID

			const {Elements, is_Active, Next} = Context.use()

			let $: HTMLButtonElement


    //#################//
    //##  Lifecycle  ##//
    //#################//

			onMount  (() => {Elements.Buttons[tabID] = $   })
			onCleanup(() => {delete Elements.Buttons[tabID]})


    //################//
    //##  Template  ##//
    //################//

			return (
				<button
					ref = {$}
					class = {clsx(
						"TAB-BUTTON",
						`ID_${tabID}`,
						props.class,
						{Active:is_Active.Button(tabID)}
					)}
					onClick = {() => {
						Next(tabID)
					}}
				>
					{props.children ?? tabID}
				</button>
			)

	}


//####################################################################################################################//
//##>  Exports.Namespace                                                                                            ##//
//####################################################################################################################//

	export namespace Button{
		export type Props = BaseProps<{
			tabID: string
		}>
	}
