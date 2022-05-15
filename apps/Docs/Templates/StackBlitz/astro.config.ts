import {defineConfig} from "astro/config"
import React          from "@astrojs/react"
import Solid          from "@astrojs/solid-js"
import Svelte         from "@astrojs/svelte"
import Vue            from "@astrojs/vue"


export default defineConfig({

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
	],

})
