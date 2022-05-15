"use strict";
/** @jsxImportSource solid-js */
Object.defineProperty(exports, "__esModule", { value: true });
//###  Module  ###//
const ManagerInstance_1 = require("../Runtime/ManagerInstance");
const DOM_1 = require("../Utilities/DOM");
//###  NPM  ###//
const solid_element_1 = require("solid-element");
const solid_js_1 = require("solid-js");
//####################################################################################################################//
//##>  WebComponent.Properties                                                                                      ##//
//####################################################################################################################//
const defaultProps = {
    to: undefined,
    name: undefined,
    position: undefined,
};
//####################################################################################################################//
//##>  WebComponent.Initialize                                                                                      ##//
//####################################################################################################################//
(0, solid_element_1.customElement)("portal-entrance", defaultProps, ((props, component) => {
    var _a;
    const $Root = component.element;
    const name = ((_a = props.name) !== null && _a !== void 0 ? _a : props.to);
    $Root.setAttribute("name", name);
    let placingContents = false;
    (0, solid_js_1.onMount)(() => {
        place_Contents();
        (0, ManagerInstance_1.Manager)().send({ type: "REGISTER_ENTRANCE", destinationID: props.to, entranceID: name, position: props.position, $: $Root });
    });
    (0, solid_js_1.onCleanup)(() => {
        if (placingContents) {
            return;
        }
        (0, ManagerInstance_1.Manager)().send({ type: "UNREGISTER_ENTRANCE", destinationID: props.to, entranceID: name });
    });
    function place_Contents() {
        placingContents = true;
        const $TransportContents = [...$Root.childNodes]
            .filter(($) => !DOM_1.ResourceTags.includes($.tagName));
        const { $Entrances } = (0, DOM_1.ensure_Storage)({ destinationID: props.to });
        const $Transport = (0, DOM_1.create_Element_From_HTML)(`<portal-transport to="${props.to}" name="${name}"/>`);
        $Transport.append(...$TransportContents);
        $Root.appendChild($Transport);
        $Entrances.appendChild($Root);
        placingContents = false;
    }
    return <slot />;
}));
//# sourceMappingURL=Entrance.jsx.map