//###  Module  ###//
import {Selector, Tag} from "./Selectors"


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export const ResourceTags = [
		"LINK",
		"SCRIPT",
	]

	export function create_Element(
		{attributes,                         className,         tag,         $Container            }:
		{attributes?:Record<string, string>, className?:string, tag?:string, $Container:HTMLElement}
	){
		tag ??= "div"

		const $ = document.createElement(tag)

		if(className)
			{$.className = className}

		if(attributes){
			for(const [key, value] of Object.entries(attributes))
				{$.setAttribute(key, value)}
		}

		$Container.appendChild($)

		return $
	}

	export function create_Element_From_HTML(text:string){
		var $ = document.createElement("div")
		$.innerHTML = text.trim()
		return ($.firstChild as HTMLElement)
	}

	export function ensure_Element(
		{attributes,                         className,         selector,        tag,         $Container            }:
		{attributes?:Record<string, string>, className?:string, selector:string, tag?:string, $Container:HTMLElement}
	){
		let $ = $Container.querySelector<HTMLElement>(selector)

		$ ??= create_Element({attributes, className, tag, $Container})

		return $
	}

	export function ensure_Storage(
		{destinationID       }:
		{destinationID:string}
	){
		const $Root = ensure_Element({selector:Tag.Root, tag:Tag.Root, $Container:document.body})

		return {
			$Entrances: ensure_Element({
				$Container: $Root,
				selector:   Selector.Entrances({destinationID}),
				tag:        Tag.Entrances,
				attributes: {destination:destinationID},
			}),
		}
	}

	export function transfer_DOM_Node(
		{target,        to       }:
		{target:string, to:string}
	){
		const $Target = document.querySelector(target)
		const $To     = document.querySelector(to    )
		$To.appendChild($Target)
	}
