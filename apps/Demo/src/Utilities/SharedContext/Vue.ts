//###  NPM  ###//
import {ref          } from "vue"
import {get, Readable} from "svelte/store"


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export function useSharedContext
		<Value>
		(selector:Readable<Value>)
	{
		const initialValue = get(selector)
		const count        = ref(initialValue)

		selector.subscribe((value) => {(count.value as Value) = value})

		return count
	}
