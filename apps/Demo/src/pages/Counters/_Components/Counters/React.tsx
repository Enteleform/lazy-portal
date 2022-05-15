/** @jsxImportSource react */

//###  App  ###//
import {Log} from "Utilities/Log"

//###  NPM  ###//
import {PropsWithChildren, useEffect, useState} from "react"


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export function ReactCounter(props:PropsWithChildren<{}>){
		const [count, setCount] = useState(0)

		function decrement(){Log.Update("Counter.React");  setCount((i) => (i - 1));}
		function increment(){Log.Update("Counter.React");  setCount((i) => (i + 1));}

		useEffect(()=>{
			Log.Mount("Counter.React")
		}, [])

		return (
			<div className="Counter React">

				<div className="Logo">
					{props.children}
				</div>

				<div className="Controls">
					<button className="Decrement" onClick={decrement}>
						{"-"}
					</button>

					<div className="Count">
						{count}
					</div>

					<button className="Increment" onClick={increment}>
						{"+"}
					</button>
				</div>

			</div>
		)
	}
