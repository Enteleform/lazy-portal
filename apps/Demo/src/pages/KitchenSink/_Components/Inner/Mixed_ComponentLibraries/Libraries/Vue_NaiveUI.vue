<!--###  Reference:  ###-->
<!-- https://www.naiveui.com/en-US/os-theme/components/color-picker#basic.vue -->



<script lang="ts">

	//###  NPM  ###//
	import {defineComponent, ref} from "vue"
	import {
		darkTheme,
		NColorPicker,
		NConfigProvider,
		NSpace,
	} from "naive-ui"


	export default defineComponent({
		components: {
			NColorPicker,
			NConfigProvider,
			NSpace,
		},
		setup(){
			const show = ref(false)

			setTimeout(()=>{
				show.value = true
			}, 0)

			return {
				darkTheme,
				show,
			}
		}
	})

</script>



<template>

	<NConfigProvider :theme="darkTheme">
		<NSpace vertical class="ColorPicker Container">

			<NColorPicker
				:show         = "show"
				to            = "#ColorPicker"
				hsl           = "hsl"
				default-value = "hsl(224, 40%, 40%)"
				placement     = "bottom"
			/>

			<div id="ColorPicker"/>

		</NSpace>
	</NConfigProvider>

</template>
