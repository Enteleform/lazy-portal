/** @jsxImportSource solid-js */

import {createSignal} from "solid-js"


export function Counter(){
	const [count, setCount] = createSignal<number>(0)

	function decrement(){setCount(count() - 1)}
	function increment(){setCount(count() + 1)}

	return (
		<div class="Counter Solid">

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
