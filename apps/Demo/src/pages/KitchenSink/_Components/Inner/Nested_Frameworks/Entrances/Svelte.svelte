
<script lang="ts">

	export let to: string

</script>



<portal-entrance to={`Svelte-To-${to}`}>
	<div class="Container Inner">

		<div class="Framework">
			Svelte
		</div>

		<div class="Content">
			<code>Svelte</code> in <code>{to}</code>!
		</div>

	</div>
</portal-entrance>
