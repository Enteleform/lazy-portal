
//####################################################################################################################//
//##>  Exports.Type                                                                                                 ##//
//####################################################################################################################//

	export type Payload<
		Event extends {type:string},
		Key   extends Event["type"] = Event["type"],
	> =
		Extract<Event, {type:Key}>


//####################################################################################################################//
//##>  Exports.Namespace                                                                                            ##//
//####################################################################################################################//

	export namespace Payload{

		export type WithoutType<
			Event extends {type:string},
			Key   extends Event["type"] = Event["type"],
		> =
			Omit<Payload<Event, Key>, "type">

		export type Map<Event extends {type:string}> =
			{[K in Event["type"]]: Extract<Event, {type:K}>}

	}
