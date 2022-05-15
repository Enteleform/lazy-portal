
<script>

	//###  App  ###//
	import {Counter         } from "../../_Models/Counter"
	import {Log             } from "Utilities/Log"
	import {useSharedContext} from "Utilities/SharedContext/Svelte"

	//###  NPM  ###//
	import {onMount} from "svelte"


	const count = useSharedContext(Counter.count)

	onMount(()=>{
		Log.Mount("Counter.Svelte")
	})

</script>



<div class="Counter Svelte">

	<div class="Logo">
		<slot/>
	</div>

	<div class="Controls">
		<button class="Decrement" on:click={Counter.decrement}>
			{"-"}
		</button>

		<div class="Count">
			{$count}
		</div>

		<button class="Increment" on:click={Counter.increment}>
			{"+"}
		</button>
	</div>

</div>
