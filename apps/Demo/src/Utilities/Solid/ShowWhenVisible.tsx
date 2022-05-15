/** @jsxImportSource solid-js */

//###  NPM  ###//
import {createVisibilityObserver} from "@solid-primitives/intersection-observer"
import {
	PropsWithChildren,
	Show,
} from "solid-js"


//####################################################################################################################//
//##>  Exports.Component                                                                                            ##//
//####################################################################################################################//

	export function ShowWhenVisible(props:ShowWhenVisible.Props){
		let $: HTMLDivElement

    const [is_Visible] =
			createVisibilityObserver(
				(() => $),
				{once:true}
			)

		return (
			<div ref={$} class="SHOW_WHEN_VISIBLE" style={{
				//display: "contents", /* [ISSUE.30] restore when resolved */
				display: "flex",       /* [ISSUE.30] remove  when resolved */
				width:   "100%",       /* [ISSUE.30] remove  when resolved */
				height:  "100%",       /* [ISSUE.30] remove  when resolved */
			}}>
				<Show when={is_Visible()}>
					{props.children}
				</Show>
			</div>
		)
	}


//####################################################################################################################//
//##>  Exports.Namespace                                                                                            ##//
//####################################################################################################################//

	export namespace ShowWhenVisible{

		export type Props = PropsWithChildren

	}
