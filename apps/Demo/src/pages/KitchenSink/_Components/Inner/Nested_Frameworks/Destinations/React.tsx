/** @jsxImportSource react */

//###  NPM  ###//
import NoSSR from "react-no-ssr"


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export function Destination_React(){
		return (
			<div className="Container Outer">

				<div className="Framework">
					{"React"}
				</div>

				<div className="Content">
					<NoSSR><>
						<portal-destination name="Astro-To-React" />
						<portal-destination name="React-To-React" />
						<portal-destination name="Solid-To-React" />
						<portal-destination name="Svelte-To-React"/>
						<portal-destination name="Vue-To-React"   />
					</></NoSSR>
				</div>

			</div>
		)
	}
