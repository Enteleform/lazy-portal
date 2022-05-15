//###  Framework  ###//
import {AstroPortal} from "astro-portal"

//###  NPM  ###//
import {defineConfig as Configuration} from "astro/config"
import Preact                          from "@astrojs/preact"
import React                           from "@astrojs/react"
import Solid                           from "@astrojs/solid-js"


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export default Configuration({

		integrations: [
			/* Renderers */
			Preact(),
			React (),
			Solid (),

			/* WebComponents */
			AstroPortal(),
		],

		markdown: {
			shikiConfig: {
				theme: "nord",
			},
		},

		vite: {
			server: {
				strictPort: true,
			},
		},

	})
