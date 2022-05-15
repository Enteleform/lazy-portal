
<script>

	//###  App  ###//
	import {Log} from "Utilities/Log"

	//###  NPM  ###//
	import {onMount} from "svelte"


	let count = 0

	function decrement(){Log.Update("Counter.Svelte");  count--;}
	function increment(){Log.Update("Counter.Svelte");  count++;}

	onMount(()=>{
		Log.Mount("Counter.Svelte")
	})

</script>


<div class="Counter Svelte">

	<div class="Logo">
		<slot/>
	</div>

	<div class="Controls">
		<button class="Decrement" on:click={decrement}>
			{"-"}
		</button>

		<div class="Count">
			{count}
		</div>

		<button class="Increment" on:click={increment}>
			{"+"}
		</button>
	</div>

</div>
