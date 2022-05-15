
<script lang="ts">

	//###  App  ###//
	import {Log} from "Utilities/Log"

  //###  NPM  ###//
	import {defineComponent, ref} from "vue"


	export default defineComponent({
		setup(){
			const count = ref(0)

			function increment(){Log.Update("Counter.Vue");  count.value++;}
			function decrement(){Log.Update("Counter.Vue");  count.value--;}

			return {
				count,
				increment,
				decrement,
			}
		},

		mounted(){
			Log.Mount("Counter.Vue")
		},
	})

</script>



<template>

	<div class="Counter Vue">

		<div class="Logo">
			<slot/>
		</div>

		<div class="Controls">
			<button class="Decrement" @click="decrement()">
				{{"-"}}
			</button>

			<div class="Count">
				{{count}}
			</div>

			<button class="Increment" @click="increment()">
				{{"+"}}
			</button>
		</div>

	</div>

</template>
