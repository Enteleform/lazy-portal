<!--###  Reference:  ###-->
<!-- https://www.naiveui.com/en-US/os-theme/components/button#basic.vue -->



<script lang="ts">

	//###  NPM  ###//
	import {defineComponent} from "vue"
	import {
		darkTheme,
		NConfigProvider,
		NTabPane,
		NTabs,
	} from "naive-ui"


	export default defineComponent({
		components: {
			NConfigProvider,
			NTabPane,
			NTabs,
		},
		setup(){
			return {
				darkTheme,
			}
		},
	})

</script>



<template>

	<NConfigProvider :theme="darkTheme">
		<NTabs
			class           = "TAB-CONTAINER"
			pane-class      = "TAB-PANEL"
			type            = "line"
			justify-content = "center"
		>

			<NTabPane tab="Mixed-ComponentLibs" name="1" display-directive="show:lazy"> <portal-destination name="Mixed-ComponentLibraries"/> </NTabPane>
			<NTabPane tab="Mixed-FramerMotion"  name="2" display-directive="show:lazy"> <portal-destination name="Mixed-FramerMotion"      /> </NTabPane>
			<NTabPane tab="Astro-Markdown"      name="3" display-directive="show:lazy"> <portal-destination name="Astro-Markdown"          /> </NTabPane>
			<NTabPane tab="React-ThreeFiber"    name="4" display-directive="show:lazy"> <portal-destination name="React-ThreeFiber"        /> </NTabPane>
			<NTabPane tab="Solid-Lume"          name="5" display-directive="show:lazy"> <portal-destination name="Solid-Lume"              /> </NTabPane>
			<NTabPane tab="Nested-Frameworks"   name="6" display-directive="show:lazy"> <portal-destination name="Nested-Frameworks"       /> </NTabPane>

		</NTabs>
	</NConfigProvider>

</template>


