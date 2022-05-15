/** @jsxImportSource solid-js */


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export function Entrance_Solid(props:{to:string}){
		return (
			<portal-entrance to={`Solid-To-${props.to}`}>
				<div class="Container Inner">

					<div class="Framework">
						{"Solid"}
					</div>

					<div class="Content">
						<code>Solid</code> in <code>{props.to}</code>!
					</div>

				</div>
			</portal-entrance>
		)
	}
