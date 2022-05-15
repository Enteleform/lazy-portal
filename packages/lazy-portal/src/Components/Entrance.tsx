/** @jsxImportSource solid-js */

//###  Module  ###//
import {Manager        } from "Runtime/ManagerInstance"
import {Props as _Props} from "Types/Props"
import {
	create_Element_From_HTML,
	ensure_Storage,
	ResourceTags,
} from "Utilities/DOM"

//###  NPM  ###//
import {customElement     } from "solid-element"
import {onMount, onCleanup} from "solid-js"


//####################################################################################################################//
//##>  Aliases                                                                                                      ##//
//####################################################################################################################//

	import Props = _Props.Entrance


//####################################################################################################################//
//##>  WebComponent.Properties                                                                                      ##//
//####################################################################################################################//

	const defaultProps: Required<Props> = {
		to:       undefined,
		name:     undefined,
		position: undefined,
	}


//####################################################################################################################//
//##>  WebComponent.Initialize                                                                                      ##//
//####################################################################################################################//

	customElement("portal-entrance", defaultProps, ((props, component) => {

		const $Root = (component.element as any as HTMLElement)

		const name = (props.name ?? props.to)
		$Root.setAttribute("name", name)

		let placingContents = false

		onMount(()=>{
			place_Contents()
			Manager().send({type:"REGISTER_ENTRANCE", destinationID:props.to, entranceID:name, position:props.position, $:$Root})
		})

		onCleanup(()=>{
			if(placingContents)
				{return}

			Manager().send({type:"UNREGISTER_ENTRANCE", destinationID:props.to, entranceID:name})
		})

		function place_Contents(){
			placingContents = true

			const $TransportContents =
				([...$Root.childNodes] as HTMLElement[])
				.filter(($) => !ResourceTags.includes($.tagName))

			const {$Entrances} = ensure_Storage({destinationID:props.to})
			const $Transport   = create_Element_From_HTML(`<portal-transport to="${props.to}" name="${name}"/>`)

			$Transport.append(...$TransportContents)

			$Root.appendChild($Transport)
			$Entrances.appendChild($Root)

			placingContents = false
		}

		return <slot/>

	}))
