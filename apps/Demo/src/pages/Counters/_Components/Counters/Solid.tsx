/** @jsxImportSource solid-js */

//###  App  ###//
import {Log} from "Utilities/Log"

//###  NPM  ###//
import {createSignal, onMount, PropsWithChildren} from "solid-js"


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export function SolidCounter(props:PropsWithChildren){
		const [count, setCount] = createSignal(0)

		function decrement(){Log.Update("Counter.Solid");  setCount(count() - 1);}
		function increment(){Log.Update("Counter.Solid");  setCount(count() + 1);}

		onMount(()=>{
			Log.Mount("Counter.Solid")
		})

		return (
			<div class="Counter Solid">

				<div class="Logo">
					{props.children}
				</div>

				<div class="Controls">
					<button class="Decrement" onClick={decrement}>
						{"-"}
					</button>

					<div class="Count">
						{count()}
					</div>

					<button class="Increment" onClick={increment}>
						{"+"}
					</button>
				</div>

			</div>
		)
	}
