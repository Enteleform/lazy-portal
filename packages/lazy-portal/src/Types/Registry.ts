//###  Module  ###//
import type {Props as _Props} from "./Props"


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export namespace Props{

		export type Destination = Required<_Props.Destination               >
		export type Entrance    = Required<Omit<_Props.Entrance, "children">>

		type Destination_ID = Pick<Destination, ("name"       )>
		type Entrance_ID    = Pick<Entrance,    ("name" | "to")>

		export namespace Destination{
			export type Create     = Destination
			export type Connect    = Destination_ID
			export type Disconnect = Destination_ID
		}

		export namespace Entrance{
			export type Create     = Entrance
			export type Connect    = Entrance_ID
			export type Disconnect = Entrance_ID
		}

		export namespace Transport{
			export type Create     = Entrance
			export type Connect    = Entrance_ID
			export type Disconnect = Entrance_ID
		}

	}
