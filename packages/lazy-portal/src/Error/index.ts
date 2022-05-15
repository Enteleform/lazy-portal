//###  Module  ###//
import type {Manager} from "State/Manager"


//####################################################################################################################//
//##>  Aliases                                                                                                      ##//
//####################################################################################################################//

	const _Error = globalThis.Error


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export namespace Error{

		export class Duplicate_DestinationID extends _Error{
			static   ErrorName = "LazyPortal.Duplicate_DestinationID"
			override name      = "LazyPortal.Duplicate_DestinationID"

			constructor(
				{destinationID       }:
				{destinationID:string}
			){
				super()
				this.message = (""
					+ `\n`
					+ `\n  Portal Destination with ID \`${destinationID}\` already exists.\n`
				)
			}
		}

		export class Duplicate_EntranceID extends _Error{
			static   ErrorName = "LazyPortal.Duplicate_EntranceID"
			override name      = "LazyPortal.Duplicate_EntranceID"

			constructor(
				{entranceID       }:
				{entranceID:string}
			){
				super()
				this.message = (""
					+ `\n`
					+ `\n  Portal Entrance with ID \`${entranceID}\` already exists.\n`
				)
			}
		}

		export class TransferError extends _Error{
			static   ErrorName = "LazyPortal.TransferError"
			override name      = "LazyPortal.TransferError"

			constructor(
				{context,                 event                             }:
				{context:Manager.Context, event:Manager.TransferPayload<any>}
			){
				super()
				this.message = (""
					+ `\n`
					+ `\n  ${JSON.stringify({context, event})}\n`
				)
			}
		}

		export class Destination_Occupied extends _Error{
			static   ErrorName = "LazyPortal.Destination_Occupied"
			override name      = "LazyPortal.Destination_Occupied"

			constructor(
				{destinationID       }:
				{destinationID:string}
			){
				super()
				this.message = (""
					+ `\n`
					+ `\n  Portal Destination with ID \`${destinationID}\` is already occupied.\n`
					+ `\n  Use \`transfer-mode="Multiple"\` to allow multiple occupants.\n`
				)
			}
		}

	}
