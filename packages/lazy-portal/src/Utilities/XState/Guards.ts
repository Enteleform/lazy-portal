
//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export namespace guards{

		export function every(...guards:Guard[]){
			return function every(context:any, event:any, meta:any){
				return guards.every((guard) => {

					if(typeof guard === "string")
						{return meta.state.machine.options.guards[guard](context, event, meta)}

					else{
						let result = true

						for(const [guardKey, isTrue] of Object.entries(guard)){
							const guardValue = meta.state.machine.options.guards[guardKey](context, event, meta)

							result = (result && (false
								|| (isTrue  && guardValue )
								|| (!isTrue && !guardValue)
							))
						}

						return result
					}

				})
			}
		}

		export function some(...guards:Guard[]){
			return function some(context:any, event:any, meta:any){
				return guards.some((guard) => {

					if(typeof guard === "string")
						{return meta.state.machine.options.guards[guard](context, event, meta)}

					else{
						let result = false

						for(const [guardKey, isTrue] of Object.entries(guard)){
							const guardValue = meta.state.machine.options.guards[guardKey](context, event, meta)

							result = (result || (false
								|| (isTrue  && guardValue )
								|| (!isTrue && !guardValue)
							))
						}

						return result
					}

				})
			}
		}

		export function none(...guards:Guard[]){
			return function none(context:any, event:any, meta:any)
				{return !some(...guards)(context, event, meta)}
		}

	}


//####################################################################################################################//
//##>  Types                                                                                                        ##//
//####################################################################################################################//

	type Guard =
		| string
		| Record<string, boolean>
