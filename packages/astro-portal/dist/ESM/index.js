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
export function AstroPortal() {
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
//# sourceMappingURL=index.js.map