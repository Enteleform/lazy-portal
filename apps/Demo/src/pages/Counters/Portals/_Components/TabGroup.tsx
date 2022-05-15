/** @jsxImportSource solid-js */

//###  App  ###//
import "./TabGroup.scss"
import {Tab} from "Components/Tab"


//####################################################################################################################//
//##>  Setup                                                                                                        ##//
//####################################################################################################################//

	const ID = {
		Astro:    "Astro",
		Lit:      "Lit",
		Markdown: "Markdown",
		Preact:   "Preact",
		React:    "React",
		Solid:    "Solid",
		Svelte:   "Svelte",
		Vue:      "Vue",
	} as const


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export function TabGroup(){
		const animate_TabChange = Tab.Transition.on_Change(
			{
				duration:   0,
				activate:   ["Button"],
				transition: {previous:"Out-Start"},
			},
			{
				duration:   30,
				transition: {previous:"Out-End"},
			},
			{
				duration:   400,
				activate:   ["Panel", "Container"],
				transition: {
					previous: null,
					next:     "In-Start",
				},
			},
			{
				duration:   30,
				transition: {next:"In-End"},
			},
			{
				duration:   400,
				transition: {next:"Complete"},
			},
		)

		return (
			<Tab.Container
				active    = {undefined        }
				urlQuery  = {"Renderer"       }
				//panelMode = {"Remove"         }
				panelMode = {"Persist.Lazy"   }
				on_Change = {animate_TabChange}
			>

				<Tab.Buttons>
					<div class="Row">
						<Tab.Button tabID={ID.Astro   }/>
						<Tab.Button tabID={ID.Lit     }/>
						<Tab.Button tabID={ID.Markdown}/>
						<Tab.Button tabID={ID.Preact  }/>
					</div>
					<div class="Row">
						<Tab.Button tabID={ID.React }/>
						<Tab.Button tabID={ID.Solid }/>
						<Tab.Button tabID={ID.Svelte}/>
						<Tab.Button tabID={ID.Vue   }/>
					</div>
				</Tab.Buttons>

				<Tab.Panels>
					<div class="Background">
						<Tab.Panel tabID={ID.Astro   }> <portal-destination name={ID.Astro   }/> </Tab.Panel>
						<Tab.Panel tabID={ID.Lit     }> <portal-destination name={ID.Lit     }/> </Tab.Panel>
						<Tab.Panel tabID={ID.Markdown}> <portal-destination name={ID.Markdown}/> </Tab.Panel>
						<Tab.Panel tabID={ID.Preact  }> <portal-destination name={ID.Preact  }/> </Tab.Panel>
						<Tab.Panel tabID={ID.React   }> <portal-destination name={ID.React   }/> </Tab.Panel>
						<Tab.Panel tabID={ID.Solid   }> <portal-destination name={ID.Solid   }/> </Tab.Panel>
						<Tab.Panel tabID={ID.Svelte  }> <portal-destination name={ID.Svelte  }/> </Tab.Panel>
						<Tab.Panel tabID={ID.Vue     }> <portal-destination name={ID.Vue     }/> </Tab.Panel>
					</div>
				</Tab.Panels>

			</Tab.Container>
		)
	}
