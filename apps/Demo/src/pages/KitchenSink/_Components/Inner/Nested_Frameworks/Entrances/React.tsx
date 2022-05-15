/** @jsxImportSource react */


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export function Entrance_React(props:{to:string}){
		return (
			<portal-entrance to={`React-To-${props.to}`}>
				<div className="Container Inner">

					<div className="Framework">
						{"React"}
					</div>

					<div className="Content">
						<code>React</code> in <code>{props.to}</code>!
					</div>

				</div>
			</portal-entrance>
		)
	}
