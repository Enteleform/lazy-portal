/** @jsxImportSource solid-js */

//###  App  ###//
import {Counter         } from "../../_Models/Counter"
import {Log             } from "Utilities/Log"
import {useSharedContext} from "Utilities/SharedContext/Solid"

//###  NPM  ###//
import {onMount, PropsWithChildren} from "solid-js"


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export function SolidCounter(props:PropsWithChildren){
		const count = useSharedContext(Counter.count)

		onMount(()=>{
			Log.Mount("Counter.Solid")
		})

		return (
			<div class="Counter Solid">

				<div class="Logo">
					{props.children}
				</div>

				<div class="Controls">
					<button class="Decrement" onClick={Counter.decrement}>
						{"-"}
					</button>

					<div class="Count">
						{count()}
					</div>

					<button class="Increment" onClick={Counter.increment}>
						{"+"}
					</button>
				</div>

			</div>
		)
	}
