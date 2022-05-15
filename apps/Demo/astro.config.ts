//###  Framework  ###//
import {AstroPortal} from "astro-portal"

//###  NPM  ###//
import {defineConfig as Configuration} from "astro/config"
import Rehype_MathJax                  from "rehype-mathjax/svg.js"
import Remark_Math                     from "remark-math"
import PersistOptimizations            from "vite-plugin-optimize-persist"
import Manage_PackageJSON              from "vite-plugin-package-config"

//###  NPM.AstroRenderers  ###//
//import Lit    from "@astrojs/lit"     /* [ISSUE.1] restore when fixed */
//import Preact from "@astrojs/preact"  /* [ISSUE.2] restore when fixed */
import React  from "@astrojs/react"
import Solid  from "@astrojs/solid-js"
import Svelte from "@astrojs/svelte"
import Vue    from "@astrojs/vue"


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export default Configuration({

		root:      "./",
		publicDir: "./public",
		outDir:    "./dist",
		srcDir:    "./src/",

		server: {
			host: "0.0.0.0",
			port: 3000,
		},

		integrations: [
			//Lit   (),  /* [ISSUE.1] restore when fixed */
			//Preact(),  /* [ISSUE.2] restore when fixed */
			React (),
			Solid (),
			Svelte(),

			Vue({
				template: {
					compilerOptions: {
						isCustomElement: ((tag) => tag.includes("-")),
					},
				},
			}),

			AstroPortal(),
		],

		markdown: {
			rehypePlugins: [
				Rehype_MathJax,
			],
			remarkPlugins: [
				Remark_Math,
			],
			shikiConfig: {
				theme: "nord",
			},
		},

		vite: {
			server: {
				strictPort: true,
			},

			build: {
				commonjsOptions: {
					transformMixedEsModules: true,
					esmExternals:            true,
				},
			},

			plugins: [
				Manage_PackageJSON({packageJsonPath:"./.vite/OptimizeDeps.json"}),
				PersistOptimizations(),
			],
		},
	})
