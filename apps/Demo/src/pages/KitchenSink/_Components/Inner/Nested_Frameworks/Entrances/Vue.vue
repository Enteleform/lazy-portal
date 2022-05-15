
<script lang="ts">

	//###  NPM  ###//
	import {defineComponent} from "vue"


	export default defineComponent({
		props: {
			to: {type:String, required:true},
		},

		setup(props){
			return {
				to: props.to,
			}
		},
	})

</script>



<template>

	<portal-entrance :to="`Vue-To-${to}`">
		<div class="Container Inner">

			<div class="Framework">
				Vue
			</div>

			<div class="Content">
				<code>Vue</code> in <code>{{to}}</code>!
			</div>

		</div>
	</portal-entrance>

</template>
