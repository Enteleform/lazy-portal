
<script lang="ts">

	//###  App  ###//
	import {Counter         } from "../../_Models/Counter"
	import {Log             } from "Utilities/Log"
	import {useSharedContext} from "Utilities/SharedContext/Vue"

  //###  NPM  ###//
	import {defineComponent} from "vue"


	export default defineComponent({
		setup(){
			const count = useSharedContext(Counter.count)

			return {
				count,
				Counter,
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
			<button class="Decrement" @click="Counter.decrement">
				{{"-"}}
			</button>

			<div class="Count">
				{{count}}
			</div>

			<button class="Increment" @click="Counter.increment">
				{{"+"}}
			</button>
		</div>

	</div>

</template>
