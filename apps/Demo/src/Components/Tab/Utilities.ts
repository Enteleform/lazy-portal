//###  App  ###//
import {Class as ClassUtils} from "Utilities/Class"
import {ChangeCase         } from "Utilities/Types/ChangeCase"


//####################################################################################################################//
//##>  Aliases                                                                                                      ##//
//####################################################################################################################//

	const {to_Selector, remove_Pattern} = ClassUtils


//####################################################################################################################//
//##>  Exports.Class                                                                                                ##//
//####################################################################################################################//

	export namespace Class{

		export namespace TabState{
			export const Fragments = {
				Active:   "ActiveTab",
				Previous: "PreviousTab",
				Next:     "NextTab",
			} as const

			export const Active   = (id:string) => `${Fragments.Active  } ${Fragments.Active  }-${id}`
			export const Previous = (id:string) => `${Fragments.Previous} ${Fragments.Previous}-${id}`
			export const Next     = (id:string) => `${Fragments.Next    } ${Fragments.Next    }-${id}`

			export function remove(element?:HTMLElement)
				{remove_Pattern({element, pattern:RegEx.TabStates})}
		}

		export namespace Transition{
			export const Fragments = {
				In:        "Transition-In",
				In_Start:  "Transition-In-Start",
				In_End:    "Transition-In-End",
				Out:       "Transition-Out",
				Out_Start: "Transition-Out-Start",
				Out_End:   "Transition-Out-End",
				Complete:  "Transition-Complete",
			} as const

			export function add(
				element: (HTMLElement | undefined),
				mode:    TransitionMode,
			){
				if(!element)
					{return}

				remove(element)

				if     (mode === "In-Start" ){element.classList.add(Fragments.In,  Fragments.In_Start )}
				else if(mode === "In-End"   ){element.classList.add(Fragments.In,  Fragments.In_End   )}
				else if(mode === "Out-Start"){element.classList.add(Fragments.Out, Fragments.Out_Start)}
				else if(mode === "Out-End"  ){element.classList.add(Fragments.Out, Fragments.Out_End  )}
				else if(mode === "Complete" ){element.classList.add(Fragments.Complete                )}
			}

			export function remove(element?:HTMLElement)
				{remove_Pattern({element, pattern:RegEx.Transitions})}
		}
	}


//####################################################################################################################//
//##>  Exports.Selector                                                                                             ##//
//####################################################################################################################//

	export namespace Selector{

		export const TabState = {
			Active:   ((id:string) => to_Selector(Class.TabState.Active  (id))),
			Previous: ((id:string) => to_Selector(Class.TabState.Previous(id))),
			Next:     ((id:string) => to_Selector(Class.TabState.Next    (id))),
		} as const

		export const Transition = {
			In:        to_Selector(Class.Transition.Fragments.In       ),
			In_Start:  to_Selector(Class.Transition.Fragments.In_Start ),
			In_End:    to_Selector(Class.Transition.Fragments.In_End   ),
			Out:       to_Selector(Class.Transition.Fragments.Out      ),
			Out_Start: to_Selector(Class.Transition.Fragments.Out_Start),
			Out_End:   to_Selector(Class.Transition.Fragments.Out_End  ),
			Complete:  to_Selector(Class.Transition.Fragments.Complete ),
		} as const

	}


//####################################################################################################################//
//##>  Exports.RegEx                                                                                                ##//
//####################################################################################################################//

	export namespace RegEx{
		const TabStates_WithIDs =
			Object.values(Class.TabState.Fragments)
			.map(fragment => `${fragment}-[^ ]+`)

		export const TabStates   = ClassUtils.RegEx_List({entries:[...Object.values(Class.TabState.Fragments), ...TabStates_WithIDs]})
		export const Transitions = ClassUtils.RegEx_List({entries:Object.values(Class.Transition.Fragments)                         })
	}


//####################################################################################################################//
//##>  Types                                                                                                        ##//
//####################################################################################################################//

	export type TransitionMode =
		Exclude<
			(keyof Transition_ClassFragments),
			| Transition_ClassFragments["In" ]
			| Transition_ClassFragments["Out"]
		>

	type Transition_ClassFragments = {
		[K in keyof typeof Class.Transition.Fragments as ChangeCase.Snake_To_Kebab<K>]:
		K
	}
