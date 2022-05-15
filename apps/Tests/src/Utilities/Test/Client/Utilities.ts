//###  App  ###//
import * as Values from "./Values"
import {delay}     from "../Common/Utilities"

//###  Framework  ###//
import {expect as _expect} from "Utilities/expect-boolean"
import {Portal           } from "lazy-portal"


//####################################################################################################################//
//##>  Exports.General                                                                                              ##//
//####################################################################################################################//

	export * from "../Common/Utilities"

	export import expect = _expect.silent

	export function create_Element_From_HTML(text:string){
		var $ = document.createElement("div")
		$.innerHTML = text.trim()
		return ($.firstChild as HTMLElement)
	}

	export function Element($:ElementLike){
		if(typeof $ === "string")
			{return document.querySelector<HTMLElement>($)}
		else
			{return $}
	}

	export function expect_ExactElement($A:ElementLike, $B:ElementLike){
		[$A, $B] = [Element($A), Element($B)]

		return expect.all.toPass((expect) => [
			(() => expect($A).toBeTruthy() ),
			(() => expect($A).toEqual($B)  ),
		])
	}

	export function has_Initial_PortalStructure(
		$: ReturnType<typeof get_Targets>,
		{
			Root,
			Entrances,
			Entrance,
			Transport,
		}:{
			Root:      boolean
			Entrances: boolean
			Entrance:  boolean
			Transport: boolean
		},
	){
		return ExpectedRecord({
			trueSuffix:  "Exists",
			falseSuffix: "Does Not Exist",
		}, {
			Root:      {expected:Root,      actual:expect_ExactElement($.PortalRoot,      "body > portal-root"                                                        )},
			Entrances: {expected:Entrances, actual:expect_ExactElement($.PortalEntrances, "body > portal-root > portal-entrances"                                     )},
			Entrance:  {expected:Entrance,  actual:expect_ExactElement($.PortalEntrance,  "body > portal-root > portal-entrances > portal-entrance"                   )},
			Transport: {expected:Transport, actual:expect_ExactElement($.PortalTransport, "body > portal-root > portal-entrances > portal-entrance > portal-transport")},
		})
	}

	export function exists(
		$: ReturnType<typeof get_Targets>,
		{
			Entrance,
			Transport,
			Destination,
		}:{
			Entrance:    boolean
			Transport:   boolean
			Destination: boolean
		},
	){
		return ExpectedRecord({
			trueSuffix:  "Exists",
			falseSuffix: "Does Not Exist",
		}, {
			Entrance:    {expected:Entrance,    actual:expect($.PortalEntrance   ).toBeTruthy()},
			Transport:   {expected:Transport,   actual:expect($.PortalTransport  ).toBeTruthy()},
			Destination: {expected:Destination, actual:expect($.PortalDestination).toBeTruthy()},
		})
	}

	export function has_PortalContents(
		$: ReturnType<typeof get_Targets>,
		{
			Entrance,
			Transport,
			Destination,
		}:{
			Entrance:    boolean
			Transport:   boolean
			Destination: boolean
		},
	){
		return ExpectedRecord({
			trueSuffix:  "Has Correct Contents",
			falseSuffix: "Does Not Have Correct Contents",
		}, {
			Entrance:    {expected:Entrance,    actual:expect($.PortalEntrance   ?.textContent.trim()).toEqual(Values.PortalContent)},
			Transport:   {expected:Transport,   actual:expect($.PortalTransport  ?.textContent.trim()).toEqual(Values.PortalContent)},
			Destination: {expected:Destination, actual:expect($.PortalDestination?.textContent.trim()).toEqual(Values.PortalContent)},
		})
	}

	export function has_Transport(
		$: ReturnType<typeof get_Targets>,
		{
			Entrance,
			Destination,
			Container_A,
			Container_B,
			Container_C,
		}:{
			Entrance:    boolean
			Destination: boolean
			Container_A: boolean
			Container_B: boolean
			Container_C: boolean
		},
	){
		return ExpectedRecord({
			trueSuffix:  "Contains Transport",
			falseSuffix: "Does Not Contain Transport",
		}, {
			Entrance:    {expected:Entrance,    actual:expect(Element("portal-entrance    > portal-transport"                                )).toBeTruthy()},
			Destination: {expected:Destination, actual:expect(Element("portal-destination > portal-transport"                                )).toBeTruthy()},
			Container_A: {expected:Container_A, actual:expect(Element(".PortalContainer.A > .Content > portal-destination > portal-transport")).toBeTruthy()},
			Container_B: {expected:Container_B, actual:expect(Element(".PortalContainer.B > .Content > portal-destination > portal-transport")).toBeTruthy()},
			Container_C: {expected:Container_C, actual:expect(Element(".PortalContainer.C > .Content > portal-destination > portal-transport")).toBeTruthy()},
		})
	}

	export function get_Targets(){
		return {
			Container_A:          Element(".PortalContainer.A"           ),
			Container_B:          Element(".PortalContainer.B"           ),
			Container_C:          Element(".PortalContainer.C"           ),

			Container_A__Content: Element(".PortalContainer.A > .Content"),
			Container_B__Content: Element(".PortalContainer.B > .Content"),
			Container_C__Content: Element(".PortalContainer.C > .Content"),

			PortalRoot:           Element("portal-root"                  ),
			PortalEntrances:      Element("portal-entrances"             ),

			PortalEntrance:       Element("portal-entrance"              ),
			PortalTransport:      Element("portal-transport"             ),
			PortalDestination:    Element("portal-destination"           ),
		}
	}


//####################################################################################################################//
//##>  Exports.Positions                                                                                            ##//
//####################################################################################################################//

	export namespace Positions{

		type SetupEntry ={
			text:      string
			position?: Portal.Props.Entrance["position"]
		}

		export async function set_Destination(
			{defaultPosition                                            }:
			{defaultPosition:Portal.Props.Destination["defaultPosition"]}=
			{defaultPosition:undefined                                  }
		){
			const $ = get_Targets()

			$.PortalDestination?.remove()
			await delay(0) // Registration Updates @ Portal Manager

			const defaultPosition_Attribute =
				(defaultPosition)
				? `default-position="${defaultPosition}"`
				: ""

			const $Destination = create_Element_From_HTML(`
				<portal-destination name="Portal" transfer-mode="Multiple" unmount-mode="Destroy" ${defaultPosition_Attribute}/>
			`)

			$.Container_B__Content.append($Destination)
		}

		export async function assert(
			{setup:entries,      result         }:
			{setup:SetupEntry[], result:string[]}
		){
			await _setup(entries)
			return _assert(result)
		}

		async function _setup(entries:SetupEntry[]){
			const $ = get_Targets()

			remove_All_Children($.PortalEntrances  )
			remove_All_Children($.PortalDestination)
			await delay(0) // Registration Updates @ Portal Manager

			let i = 1
			for(const {text, position} of entries){
				const positionAttribute = (
					( (position        === undefined) ? ""
					: (typeof position === "string" ) ? `position="${position}"`
					:                                   `position=${position}`
				))

				const $Entrance = create_Element_From_HTML(`
					<portal-entrance to="Portal" name="Entrance-${i}" ${positionAttribute}>
						${text}
					</portal-entrance>
				`)

				document.body.append($Entrance)

				i += 1
			}
		}

		function _assert(textValues:string[]){
			const $ = get_Targets()

			let result: Record<string, boolean> = {}

			let i = 1
			for(const text of textValues){
				const $Transport = $.PortalDestination.querySelector(`portal-transport:nth-child(${i})`)
				result[`Transport_${i} Has Correct Contents`] = ($Transport.textContent.trim() === text)
				i += 1
			}

			return result
		}

	}


//####################################################################################################################//
//##>  Types                                                                                                        ##//
//####################################################################################################################//

	type ElementLike =
		| Element
		| string

	type ExpectedRecord = {
		expected: boolean
		actual:   boolean
		trueKey:  string
		falseKey: string
	}


//####################################################################################################################//
//##>  Utilities                                                                                                    ##//
//####################################################################################################################//

	function ExpectedRecord(
		suffixes: {trueSuffix:string, falseSuffix:string},
		entries:  Record<string, {expected:boolean, actual:boolean}>,
	){
		const result: Record<string, boolean> = {}

		for(const [key, {actual, expected}] of Object.entries(entries)){
			const suffix = ((expected) ? suffixes.trueSuffix : suffixes.falseSuffix)
			result[`${key} ${suffix}`] = (actual === expected)
		}

		return result
	}

	function remove_All_Children($:Element){
    while($?.firstChild)
			{$.removeChild($.firstChild)}
	}
