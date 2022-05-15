"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AstroPortal = void 0;
//####################################################################################################################//
//##>  Setup                                                                                                        ##//
//####################################################################################################################//
const initializationScript = `
		import "lazy-portal/Client/Initialize"
	`;
const styleScript = `
		import "lazy-portal/Assets/Style.css"
	`;
//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//
function AstroPortal() {
    return {
        name: "astro-portal",
        hooks: {
            "astro:config:setup"({ injectScript }) {
                injectScript("page-ssr", styleScript.trim());
                injectScript("page", initializationScript.trim());
            },
        },
    };
}
exports.AstroPortal = AstroPortal;
//# sourceMappingURL=index.js.map