<!--###  Reference:  ###-->
<!-- https://www.naiveui.com/en-US/os-theme/components/button#basic.vue -->



<script lang="ts">

	//###  App  ###//
	import {Log} from "Utilities/Log"

	//###  NPM  ###//
	import {defineComponent} from "vue"
	import {
		darkTheme,
		NButton,
		NConfigProvider,
	} from "naive-ui"


	export default defineComponent({
		components: {
			NButton,
			NConfigProvider,
		},
		setup(){
			return {
				darkTheme,
			}
		},
		methods: {
			onClick(){
				Log.Update("Vue.NaiveUI")
			},
		},
	})

</script>



<template>

	<NConfigProvider :theme="darkTheme">

		<NButton
			class  = "BUTTON"
			@click = "onClick()"
		>
			<div class="Framework"> [Vue]    </div>
			<div class="Library"  > Naive UI </div>
		</NButton>

	</NConfigProvider>

</template>
