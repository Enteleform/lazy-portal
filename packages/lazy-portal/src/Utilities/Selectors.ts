
//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export namespace Tag{
		export const Destination = "portal-destination"
		export const Entrance    = "portal-entrance"
		export const Entrances   = "portal-entrances"
		export const Root        = "portal-root"
		export const Transport   = "portal-transport"
	}

	export namespace Selector{
		export const Entrances = (({destinationID}:{destinationID:string}) => (Tag.Entrances + `[destination="${destinationID}"]`))
	}
