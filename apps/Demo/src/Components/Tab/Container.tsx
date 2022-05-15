/** @jsxImportSource solid-js */

//###  App  ###//
import {Context   } from "./Context"
import {Transition} from "./Transition"
import {Class     } from "./Utilities"
import {BaseProps } from "Utilities/Solid"

//###  NPM  ###//
import clsx from "clsx"
import {
	batch,
	createEffect,
	onMount,
	untrack,
} from "solid-js"


//####################################################################################################################//
//##>  Exports.Component                                                                                            ##//
//####################################################################################################################//

	export type     Container = (typeof Container)
	export function Container(props:Container.Props){

		//#############//
		//##  Setup  ##//
		//#############//

			const context = Context.create({
				panelMode: (props.panelMode ?? "Persist.Lazy"),
			})

			let $:            HTMLDivElement
			let tabGroup_Key: (string | undefined)

			if(props.urlQuery)
				{tabGroup_Key = `Tab.${props.urlQuery}`}

			const transitionArgs: Transition.Args = {
				context,
				Previous: () => {const previous = context.Previous();  return ((previous) ? {id:previous, element:{button:context.Elements.Buttons[previous], panel:context.Elements.Panels[previous]}} : undefined)},
				Next:     () => {const next     = context.Next    ();  return ((next    ) ? {id:next,     element:{button:context.Elements.Buttons[next    ], panel:context.Elements.Panels[next    ]}} : undefined)},
				update:   () => {context.Previous(context.Next())                                                                                                                                                   },
			}


		//#################//
		//##  Lifecycle  ##//
		//#################//

			onMount(()=>{
				const initialTab =
					(tabGroup_Key)
					? (get_URL_Query().get(tabGroup_Key) ?? props.active)
					: props.active

				/* [ISSUE.5] remove when fixed */
				;(window as any).unsetTab = ()=>{
					context.Next(null)
				}

				setTimeout(()=>{
					batch(()=>{
						context.Next      (initialTab)
						context.set_Active(initialTab)
					})
				}, 0)
			})

			createEffect(function on_TransitionStart(){
				batch(()=>{
					const next = context.Next()
					untrack(async ()=>{
						const previous = context.Previous()
						update_Class({$, next, previous, mode:"Transition"})
						await on_Change({context, next, props, transitionArgs})
					})
				})
			})

			createEffect(function on_TransitionEnd(){
				context.Active.Container()
				const next     = untrack(context.Next    )
				const previous = untrack(context.Previous)
				update_Class({$, next, previous, mode:"Current"})
				update_URL_Query({next, tabGroup_Key})
			})


		//################//
		//##  Template  ##//
		//################//

			return (
				<Context.Provider value={context}>
					<div
						ref   = {$                                                         }
						class = {clsx("TAB-CONTAINER", `ID_${props.urlQuery}`, props.class)}
					>
						{props.children}
					</div>
				</Context.Provider>
			)

	}


//####################################################################################################################//
//##>  Exports.Namespace                                                                                            ##//
//####################################################################################################################//

	export namespace Container{
		export type Props = BaseProps<{
			active?:    string
			panelMode?: Context.PanelMode
			urlQuery?:  string
			on_Change?: ((
				{context,         Previous,                     Next,                     update             }:
				{context:Context, Previous?:(() => ChangeData), Next?:(() => ChangeData), update:(() => void)}
			) => Promise<void>)
		}>

		export type ChangeData = {
			id: string
			element: {
				button: Context["Elements"]["Buttons"][string]
				panel:  Context["Elements"]["Panels" ][string]
			}
		}
	}


//####################################################################################################################//
//##>  Utilities                                                                                                    ##//
//####################################################################################################################//

		async function on_Change(
			{context,         next,                  transitionArgs,                 props                }:
			{context:Context, next?:(string | null), transitionArgs:Transition.Args, props:Container.Props}
		){
			if(next === undefined)
				{return}
			else if(props.on_Change){
				await props.on_Change(transitionArgs)
			}
			else{
				await Transition.on_Change({
					duration:   0,
					activate:   ["Button", "Panel", "Container"],
					transition: {previous:null, next:"Complete"},
				})(transitionArgs)
			}
		}

		function update_Class(
			{$,                next,         mode,                            previous        }:
			{$:HTMLDivElement, next?:string, mode:("Current" | "Transition"), previous?:string}
		){
			Class.TabState.remove($)

			if(mode === "Transition"){
				if(previous){$.classList.add(...Class.TabState.Previous(previous).split(" "))}
				if(next    ){$.classList.add(...Class.TabState.Next    (next    ).split(" "))}
			}
			else{
				if(next){$.classList.add(...Class.TabState.Active(next).split(" "))}
			}
		}

		function update_URL_Query(
			{next,         tabGroup_Key                     }:
			{next?:string, tabGroup_Key:(string | undefined)}
		){
			if(!(tabGroup_Key))
				{return}

			const urlQuery = get_URL_Query()

			if(!next){urlQuery.delete(tabGroup_Key)   }
			else     {urlQuery.set(tabGroup_Key, next)}

			window.history.replaceState({}, "", `${location.pathname}?${urlQuery}`);
		}

		function get_URL_Query()
			{return new URLSearchParams(document.location.search)}
