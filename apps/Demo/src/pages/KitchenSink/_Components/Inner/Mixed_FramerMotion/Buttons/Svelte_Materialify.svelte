<!--###  Reference:  ###-->
<!-- https://svelte-materialify.vercel.app/components/buttons/#depressed -->



<script>

	//###  App  ###//
	import {Log} from "Utilities/Log"

  //###  NPM  ###//
  import {Button, MaterialApp} from "svelte-materialify"

</script>



<MaterialApp theme="dark">

	<Button
		class = "BUTTON"
		depressed
		on:click = {()=>{
			Log.Update("Svelte.Materialify")
		}}
	>
		<div class="Framework"> [Svelte]    </div>
		<div class="Library"  > Materialify </div>
	</Button>

</MaterialApp>
