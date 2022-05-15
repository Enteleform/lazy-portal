//###  NPM  ###//
import {useEffect, useState} from "react"
import {get, Readable      } from "svelte/store"


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export function useSharedContext
		<Value>
		(selector:Readable<Value>)
	{
		const initialValue       = get(selector)
		const [count, set_Count] = useState(initialValue)

		useEffect(()=>{
			selector.subscribe(set_Count)
		}, [])

		return count
	}
