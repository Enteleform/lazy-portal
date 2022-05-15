/** @jsxImportSource react */

//###  Reference  ###//
// https://mui.com/components/tabs/#experimental-api

//###  NPM  ###//
import {useState}                   from "react"
import NoSSR                        from "react-no-ssr"
import Box                          from "@mui/material/Box"
import Tab                          from "@mui/material/Tab"
import TabContext                   from "@mui/lab/TabContext"
import {useTabContext}              from "@mui/lab/TabContext"  /* [ISSUE.17] remove when fixed  */
import TabList                      from "@mui/lab/TabList"
//import TabPanel                     from "@mui/lab/TabPanel"  /* [ISSUE.17] restore when fixed */
import {createTheme, ThemeProvider} from "@mui/material/styles"


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export function React_MUI_Tabs(){
		const [tabID, set_TabID] = useState("Mixed-ComponentLibraries")

		const on_NextTab = (event:any, next:string) => {
			set_TabID(next)
		}

		return (
			<Theme>
				<Box className="TAB-CONTAINER" sx={{typography:"body1"}}>
					<TabContext value={tabID}>

						<Box sx={{borderBottom:1, borderColor:"divider", width:"100%"}}>
							<TabList centered onChange={on_NextTab}>
								<Tab label="Mixed-ComponentLibs" value="Mixed-ComponentLibraries"/>
								<Tab label="Mixed-FramerMotion"  value="Mixed-FramerMotion"      />
								<Tab label="Astro-Markdown"      value="Astro-Markdown"          />
								<Tab label="React-ThreeFiber"    value="React-ThreeFiber"        />
								<Tab label="Solid-Lume"          value="Solid-Lume"              />
								<Tab label="Nested-Frameworks"   value="Nested-Frameworks"       />
							</TabList>
						</Box>

						<div className="TAB-PANELS">
							<TabPanel className="TAB-PANEL" value="Mixed-ComponentLibraries"> <NoSSR><portal-destination name="Mixed-ComponentLibraries"/></NoSSR> </TabPanel>
							<TabPanel className="TAB-PANEL" value="Mixed-FramerMotion"      > <NoSSR><portal-destination name="Mixed-FramerMotion"      /></NoSSR> </TabPanel>
							<TabPanel className="TAB-PANEL" value="Astro-Markdown"          > <NoSSR><portal-destination name="Astro-Markdown"          /></NoSSR> </TabPanel>
							<TabPanel className="TAB-PANEL" value="React-ThreeFiber"        > <NoSSR><portal-destination name="React-ThreeFiber"        /></NoSSR> </TabPanel>
							<TabPanel className="TAB-PANEL" value="Solid-Lume"              > <NoSSR><portal-destination name="Solid-Lume"              /></NoSSR> </TabPanel>
							<TabPanel className="TAB-PANEL" value="Nested-Frameworks"       > <NoSSR><portal-destination name="Nested-Frameworks"       /></NoSSR> </TabPanel>
						</div>

					</TabContext>
				</Box>
			</Theme>
		)
	}


//####################################################################################################################//
//##>  Components                                                                                                   ##//
//####################################################################################################################//

	export function Theme(props:{children:JSX.Element}){
		const theme = createTheme({
			palette: {mode:"dark"},
		})

		return (
			<ThemeProvider theme={theme}>
				{props.children}
			</ThemeProvider>
		)
	}


	/* [ISSUE.17] remove when fixed  */
	//###  Reference  ###//
	// [[Tabs] Improve tab panels mounting behavior · Issue #21250 · mui/material-ui](https://github.com/mui/material-ui/issues/21250                            )
	// [mui-tab-panel-demo/TabPanel.js at master · ambroseus/mui-tab-panel-demo     ](https://github.com/ambroseus/mui-tab-panel-demo/blob/master/src/TabPanel.js)
	function TabPanel(props:any){
		const {
			children,
			style,
			value: id,
			containerProps,
			...other
		} = props

		const context = useTabContext()

		if (context === null) {
			throw new TypeError("No TabContext provided")
		}
		const tabId = context.value

		return (
			<div
				style={{
					...style,
					visibility: id === tabId ? "visible" : "hidden",
					display:    id === tabId ? "flex"    : "none",
				}}
				{...other}
			>
				{children}
			</div>
		)
	}
