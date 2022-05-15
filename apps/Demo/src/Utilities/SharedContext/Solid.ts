//###  NPM  ###//
import {createSignal } from "solid-js"
import {get, Readable} from "svelte/store"


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export function useSharedContext
		<Value>
		(selector:Readable<Value>)
	{
		const initialValue       = get(selector)
		const [count, set_Count] = createSignal(initialValue)

		selector.subscribe(set_Count as ((v:Value) => void))

		return count
	}
