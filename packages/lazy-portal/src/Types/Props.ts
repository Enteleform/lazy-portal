
//####################################################################################################################//
//##>  Exports.Destination                                                                                          ##//
//####################################################################################################################//

	export namespace Props{

		export type Destination = {
			name:             string
			transferMode?:    ("Single"  | "Multiple")
			unmountMode?:     ("Destroy" | "Persist" )
			defaultPosition?: Exclude<Props.Entrance["position"], number>
		}

		export namespace Destination{
			export const Default: Partial<Destination> = {
				transferMode:    "Single",
				unmountMode:     "Persist",
				defaultPosition: "Last",
			} as const
		}

	}


//####################################################################################################################//
//##>  Exports.Entrance                                                                                             ##//
//####################################################################################################################//

	export namespace Props{

		export type Entrance = {
			/** `name` of target `Portal.Destination`. */
			to: string

			/**
			* Unique name, defaults to the provided `to` value.
			*
			* Provide a static value when using:
			* - {transferMode:"Multiple"}
			* - manual portal management utilities
			*/
			name?: string

			position?: (number | "First" | "Last")
		}

	}


//####################################################################################################################//
//##>  Exports.Transport                                                                                             ##//
//####################################################################################################################//

	export namespace Props{

		export type Transport = {
			/** `name` of target `Portal.Destination`. */
			to: string

			/**
			* Unique name, defaults to generated value.
			*
			* Provide a static value when using manual portal management utilities.
			*/
			name?: string
		}

	}
