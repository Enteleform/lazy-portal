//###  NPM  ###//
import type {AstroIntegration} from "astro"


//####################################################################################################################//
//##>  Setup                                                                                                        ##//
//####################################################################################################################//

	const initializationScript = `
		import "lazy-portal/Client/Initialize"
	`

	const styleScript = `
		import "lazy-portal/Assets/Style.css"
	`


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export function AstroPortal(): AstroIntegration{
		return {
			name: "astro-portal",
			hooks: {
				"astro:config:setup"({injectScript}){
					injectScript("page-ssr", styleScript         .trim())
					injectScript("page",     initializationScript.trim())
				},
			},
		}
	}
