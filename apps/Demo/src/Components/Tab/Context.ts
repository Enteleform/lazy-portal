//###  App  ###//
import {BaseContext} from "Utilities/Solid"

//###  NPM  ###//
import {batch, createSelector} from "solid-js"
import * as SolidUse from "solid-use"
//import {Atom, atom           } from "solid-use"


//####################################################################################################################//
//##>  Aliases                                                                                                      ##//
//####################################################################################################################//

	const {atom} = SolidUse
	import Atom = SolidUse.Atom


//####################################################################################################################//
//##>  Exports.Type                                                                                                 ##//
//####################################################################################################################//

	export type Context = {
		IDs:       Set<string>
		panelMode: Context.PanelMode

		Next:     Atom<string>
		Previous: Atom<string>

		Active: {
			Button:    Atom<string>
			Container: Atom<string>
			Panel:     Atom<string>
		}

		is_Active: {
			Button: ((id:string) => boolean)
			Panel:  ((id:string) => boolean)
		}

		set_Active: ((id:string) => void)

		Elements: {
			Buttons: Record<string, HTMLButtonElement>
			Panels:  Record<string, HTMLDivElement   >
		}
	}


//####################################################################################################################//
//##>  Exports.Const                                                                                                ##//
//####################################################################################################################//

	export const Context = BaseContext({
		create: (({panelMode}:Context.Options): Context => {
			const Next     = atom<string>(undefined)
			const Previous = atom<string>(undefined)

			const Container = atom<string>(undefined)
			const Button    = atom<string>(undefined)
			const Panel     = atom<string>(undefined)

			return {
				IDs: new Set(),
				panelMode,

				Next,
				Previous,

				Active: {
					Button,
					Container,
					Panel,
				},

				is_Active: {
					Button: createSelector(Button),
					Panel:  createSelector(Panel ),
				},

				set_Active(id){
					batch(()=>{
						Button   (id)
						Panel    (id)
						Container(id)
					})
				},

				Elements: {
					Buttons: {},
					Panels:  {},
				},
			}
		}),
	})


//####################################################################################################################//
//##>  Exports.Namespace                                                                                            ##//
//####################################################################################################################//

	export namespace Context{
		export type Options = {
			panelMode: PanelMode
		}

		export type PanelMode =
			| "Remove"
			| "Persist.Lazy"
			| "Persist.Immediate"
	}
