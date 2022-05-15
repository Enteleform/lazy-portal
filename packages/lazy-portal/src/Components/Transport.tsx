/** @jsxImportSource solid-js */

//###  Module  ###//
import {Manager        } from "Runtime/ManagerInstance"
import {Props as _Props} from "Types/Props"

//###  NPM  ###//
import {customElement     } from "solid-element"
import {onMount, onCleanup} from "solid-js"


//####################################################################################################################//
//##>  Aliases                                                                                                      ##//
//####################################################################################################################//

	import Props = _Props.Transport


//####################################################################################################################//
//##>  WebComponent.Properties                                                                                      ##//
//####################################################################################################################//

	const defaultProps: Required<Props> = {
		to:   (undefined as string),
		name: (undefined as string),
	}


//####################################################################################################################//
//##>  WebComponent.Initialize                                                                                      ##//
//####################################################################################################################//

	customElement("portal-transport", defaultProps, ((props, component) => {

		const $Root = (component.element as any as HTMLElement)

		onMount(()=>{
			Manager().send({type:"REGISTER_TRANSPORT", destinationID:props.to, entranceID:props.name, $:$Root})
		})

		onCleanup(()=>{
			Manager().send({type:"UNREGISTER_TRANSPORT", destinationID:props.to, entranceID:props.name})
		})

		return <slot/>

	}))
