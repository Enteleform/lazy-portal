/** @jsxImportSource solid-js */

//###  App  ###//
import {Context  } from "./Context"
import {BaseProps} from "Utilities/Solid"

//###  NPM  ###//
import clsx          from "clsx"
import * as SolidUse from "solid-use"
//import {atom}        from "solid-use"
import {
	createEffect,
	onCleanup,
	onMount,
	Show,
	untrack,
} from "solid-js"


//####################################################################################################################//
//##>  Aliases                                                                                                      ##//
//####################################################################################################################//

	const {atom} = SolidUse


//####################################################################################################################//
//##>  Exports.Component                                                                                            ##//
//####################################################################################################################//

	export type     Panel = (typeof Panel)
	export function Panel(props:Panel.Props){

    //#############//
    //##  Setup  ##//
    //#############//

			const tabID = props.tabID

			const {
				Elements,
				IDs,
				is_Active,
				panelMode: contextPanelMode,
			} = Context.use()

			const panelMode    = (props.mode ?? contextPanelMode)
			const has_Rendered = atom(false)

			let $: HTMLDivElement


    //#################//
    //##  LifeCycle  ##//
    //#################//

			onMount(()=>{
				IDs.add(tabID)
				Elements.Panels[tabID] = $
			})

			onCleanup(()=>{
				IDs.delete(tabID)
				delete Elements.Panels[tabID]
			})


    //##################//
    //##  Components  ##//
    //##################//

			function PanelContent(){
				if(panelMode === "Remove"){
					return (
						<Show when={is_Active.Panel(tabID)}>
							{props.children}
						</Show>
					)
				}
				else if(panelMode === "Persist.Lazy"){
					createEffect(()=>{
						if(is_Active.Panel(tabID) && !untrack(has_Rendered))
							{untrack(() => {has_Rendered(true)})}
					})

					return (
						<Show when={is_Active.Panel(tabID) || has_Rendered()}>
							{props.children}
						</Show>
					)
				}
				else{
					return (
						<> {props.children} </>
					)
				}
			}


    //################//
    //##  Template  ##//
    //################//

			return (
				<div
					ref = {$}
					class = {clsx("TAB-PANEL", `ID_${tabID}`, props.class, {
						Active:    is_Active.Panel(tabID),
						Persisted: (panelMode !== "Remove"),
					})}
					style = {{
						...(!is_Active.Panel(tabID) ? {display:"none"} : {}),
					}}
				>

					<PanelContent/>

				</div>
			)

	}


//####################################################################################################################//
//##>  Exports.Namespace                                                                                            ##//
//####################################################################################################################//

	export namespace Panel{
		export type Props = BaseProps<{
			tabID: string,
			mode?: Context["panelMode"]
		}>
	}
