//###  NPM  ###//
import type {Config} from "@jest/types"


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export default <Config.InitialOptions>{
		rootDir: "./src/",

		preset:          "ts-jest",
		testEnvironment: "node",

		testMatch: [
			"<rootDir>/**/*.test.ts",
			"<rootDir>/**/*.test.tsx",
			"<rootDir>/**/__Tests__.ts",
			"<rootDir>/**/__Tests__.tsx",
			"<rootDir>/**/__Tests__/**/[^_]*.ts",
			"<rootDir>/**/__Tests__/**/[^_]*.tsx",
		],

	}
