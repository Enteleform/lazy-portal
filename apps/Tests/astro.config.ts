//###  Framework  ###//
import {AstroPortal} from "astro-portal"

//###  NPM  ###//
import {defineConfig as Configuration}                             from "astro/config"
import {viteCommonjs as CommonJS     }                             from "@originjs/vite-plugin-commonjs"
import Rollup_Polyfill_NodeModules                                 from "rollup-plugin-node-polyfills"
import {NodeGlobalsPolyfillPlugin as ESBuild_Polyfill_NodeGlobals} from "@esbuild-plugins/node-globals-polyfill"

//###  NPM.AstroRenderers  ###//
import React  from "@astrojs/react"
import Solid  from "@astrojs/solid-js"
import Svelte from "@astrojs/svelte"
import Vue    from "@astrojs/vue"


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export default Configuration({

		integrations: [
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

		vite: {

			server: {
				strictPort: true,
			},
			plugins: [
				CommonJS(),
			],

			//###  Reference: https://medium.com/@ftaioli/using-node-js-builtin-modules-with-vite-6194737c2cd2  ###//
			optimizeDeps: {
				esbuildOptions: {
					define: {
						global: "globalThis"
					},
					plugins: [
						ESBuild_Polyfill_NodeGlobals({
							process: true,
						}),
					]
				}
			},
			build: {
				rollupOptions: {
					plugins: [
						Rollup_Polyfill_NodeModules(),
					]
				}
			},

		},

	})
