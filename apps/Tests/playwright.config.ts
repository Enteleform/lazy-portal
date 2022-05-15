//###  Module  ###//
//import {Configuration} from "./src/Utilities/Playwright/Configuration"

//###  NPM  ###//
import {devices} from "@playwright/test"


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export default {
	//export default Configuration({

		testDir: "./",

		testMatch: [
			"src/**/*.test.ts",
			"src/**/*.test.tsx",
			"src/**/__Test__.ts",
			"src/**/__Test__.tsx",
			"src/**/__Tests__/**/[^_]*.ts",
			"src/**/__Tests__/**/[^_]*.tsx",
		],

		use: {
			baseURL:       "http://localhost:3000",
			actionTimeout: 0,
			trace:         "on-first-retry",
		},

		projects: [
			{name:"Chrome", use:{...devices["Desktop Chrome"], headless:true}},
		],

		timeout: (30 * 1000),
		expect:  {timeout:5000},

		reporter: "list",
		retries:  0,

	}
	//})
