
<script lang="ts">

	//###  NPM  ###//
	import {defineComponent} from "vue"


	export default defineComponent({})

</script>



<template>

	<div class="Container Outer">

		<div class="Framework">
			Vue
		</div>

		<div class="Content">
			<portal-destination name="Astro-To-Vue" />
			<portal-destination name="React-To-Vue" />
			<portal-destination name="Solid-To-Vue" />
			<portal-destination name="Svelte-To-Vue"/>
			<portal-destination name="Vue-To-Vue"   />
		</div>

	</div>

</template>
