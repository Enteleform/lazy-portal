/** @jsxImportSource preact */

//###  App  ###//
import {Log} from "Utilities/Log"

//###  NPM  ###//
import {ComponentChildren} from "preact"
import {useState         } from "preact/hooks"


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export function PreactCounter(props:{children:ComponentChildren}){
		const [count, setCount] = useState(0)

		function decrement(){Log.Update("Counter.Preact");  setCount((i) => (i - 1));}
		function increment(){Log.Update("Counter.Preact");  setCount((i) => (i + 1));}

		return (
			<div class="Counter Preact">

				<div class="Logo">
					{props.children}
				</div>

				<div class="Controls">
					<button class="Decrement" onClick={decrement}>
						{"-"}
					</button>

					<div class="Count">
						{count}
					</div>

					<button class="Increment" onClick={increment}>
						{"+"}
					</button>
				</div>

			</div>
		)
	}
