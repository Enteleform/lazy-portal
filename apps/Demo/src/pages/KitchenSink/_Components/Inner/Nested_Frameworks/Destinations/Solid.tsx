/** @jsxImportSource solid-js */


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export function Destination_Solid(){
		return (
			<div class="Container Outer">

				<div class="Framework">
					{"Solid"}
				</div>

				<div class="Content">
					<portal-destination name="Astro-To-Solid" />
					<portal-destination name="React-To-Solid" />
					<portal-destination name="Solid-To-Solid" />
					<portal-destination name="Svelte-To-Solid"/>
					<portal-destination name="Vue-To-Solid"   />
				</div>

			</div>
		)
	}
