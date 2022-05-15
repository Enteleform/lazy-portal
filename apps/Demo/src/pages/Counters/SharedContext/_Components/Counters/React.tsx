/** @jsxImportSource react */

//###  App  ###//
import {Counter         } from "../../_Models/Counter"
import {Log             } from "Utilities/Log"
import {useSharedContext} from "Utilities/SharedContext/React"

//###  NPM  ###//
import {PropsWithChildren, useEffect} from "react"


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export function ReactCounter(props:PropsWithChildren<{}>){
		const count = useSharedContext(Counter.count)

		useEffect(()=>{
			Log.Mount("Counter.React")
		}, [])

		return (
			<div className="Counter React">

				<div className="Logo">
					{props.children}
				</div>

				<div className="Controls">
					<button className="Decrement" onClick={Counter.decrement}>
						{"-"}
					</button>

					<div className="Count">
						{count}
					</div>

					<button className="Increment" onClick={Counter.increment}>
						{"+"}
					</button>
				</div>

			</div>
		)
	}
