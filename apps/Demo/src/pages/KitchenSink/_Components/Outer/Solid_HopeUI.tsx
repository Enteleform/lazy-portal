/** @jsxImportSource solid-js */

//###  Reference  ###//
// https://hope-ui.com/docs/navigation/tabs

//###  App  ###//
import {ShowWhenVisible} from "Utilities/Solid"

//###  NPM  ###//
import {
	HopeProvider,
	Tab,
	TabList,
	TabPanel,
	Tabs,
} from "@hope-ui/solid"


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export function Solid_HopeUI_Tabs(){
		return (
			<ShowWhenVisible>
				<HopeProvider config={{initialColorMode:"dark"}} enableCssReset={false}>
					<Tabs class="TAB-CONTAINER" alignment="center" keepAlive>

						<TabList>
							<Tab> {"Mixed-ComponentLibs"} </Tab>
							<Tab> {"Mixed-FramerMotion" } </Tab>
							<Tab> {"Astro-Markdown"     } </Tab>
							<Tab> {"React-ThreeFiber"   } </Tab>
							<Tab> {"Solid-Lume"         } </Tab>
							<Tab> {"Nested-Frameworks"  } </Tab>
						</TabList>

						<div class="TAB-PANELS">
							<TabPanel class="TAB-PANEL"> <portal-destination name="Mixed-ComponentLibraries"/> </TabPanel>
							<TabPanel class="TAB-PANEL"> <portal-destination name="Mixed-FramerMotion"      /> </TabPanel>
							<TabPanel class="TAB-PANEL"> <portal-destination name="Astro-Markdown"          /> </TabPanel>
							<TabPanel class="TAB-PANEL"> <portal-destination name="React-ThreeFiber"        /> </TabPanel>
							<TabPanel class="TAB-PANEL"> <portal-destination name="Solid-Lume"              /> </TabPanel>
							<TabPanel class="TAB-PANEL"> <portal-destination name="Nested-Frameworks"       /> </TabPanel>
						</div>

					</Tabs>
				</HopeProvider>
			</ShowWhenVisible>
		)
	}
