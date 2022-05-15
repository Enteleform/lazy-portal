//###  App  ###//
import type {Container}        from "./Container"
import type {Context  }        from "./Context"
import {Class, TransitionMode} from "./Utilities"

//###  NPM  ###//
import {batch} from "solid-js"


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export namespace Transition{

		export type Args = Parameters<Container.Props["on_Change"]>[0]

		export type Entry = {
			duration:  number,
			activate?: (keyof Context["Active"])[]
			callback?: ((args:Omit<Args, "update">) => void)
			transition?: {
				previous?: (TransitionMode | null),
				next?:     (TransitionMode | null),
			},
		}

		export function on_Change(...transitions:Entry[]){
			let timeouts:        NodeJS.Timeout[]   = []
			let transitionQueue: QueuedTransition[] = []
			let totalDuration:      number

			function reset(){
				for(const timeout of timeouts)
					{clearTimeout(timeout)}
				timeouts = []

				for(const {callback, complete} of transitionQueue){
					if(!complete)
						{callback()}
				}
				transitionQueue = []

				totalDuration = 0
			}

			return async function on_Change(transitionArgs:Args){
				await new Promise<void>((resolve) => {
					reset()

					const finish = (()=>{
						transitionArgs.update()
						resolve()
					})

					for(const transition of transitions){
						const {duration} = transition

						const queued: QueuedTransition = {
							callback: ()=>{
								update({transition, transitionArgs})
								queued.complete = true
							}
						}

						transitionQueue.push(queued)
						timeouts.push(setTimeout(queued.callback, (totalDuration + duration)))
						totalDuration += duration
					}

					timeouts.push(setTimeout(finish, (totalDuration + 1)))
				})
			}
		}

	}


//####################################################################################################################//
//##>  Types                                                                                                        ##//
//####################################################################################################################//

	type QueuedTransition = {
		callback:  (() => void)
		complete?: boolean
	}


//####################################################################################################################//
//##>  Utilities                                                                                                    ##//
//####################################################################################################################//

	const defaultActivate: Transition.Entry["activate"] = []

	function update(
		{transition:entry,            transitionArgs                }:
		{transition:Transition.Entry, transitionArgs:Transition.Args}
	){
		let   {activate, callback, transition} = entry
		const {context, Next, Previous       } = transitionArgs

		const [next, previous] = [Next(), Previous()]

		activate ??= defaultActivate

		const {Active}  = context
		const $Previous = previous?.element.panel
		const $Next     = next    ?.element.panel

		batch(()=>{
			callback?.({context, Next, Previous})

			for(const target of activate)
				{Active[target](next?.id)}
		})

		if     (transition.previous === null){Class.Transition.remove($Previous,                    )}
		else if(transition.previous         ){Class.Transition.add   ($Previous, transition.previous)}

		if     (transition.next === null){Class.Transition.remove($Next,                )}
		else if(transition.next         ){Class.Transition.add   ($Next, transition.next)}
	}
