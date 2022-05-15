"use strict";
/** @jsxImportSource solid-js */
Object.defineProperty(exports, "__esModule", { value: true });
//###  Module  ###//
const ManagerInstance_1 = require("../Runtime/ManagerInstance");
//###  NPM  ###//
const solid_element_1 = require("solid-element");
const solid_js_1 = require("solid-js");
//####################################################################################################################//
//##>  WebComponent.Properties                                                                                      ##//
//####################################################################################################################//
const defaultProps = {
    to: undefined,
    name: undefined,
};
//####################################################################################################################//
//##>  WebComponent.Initialize                                                                                      ##//
//####################################################################################################################//
(0, solid_element_1.customElement)("portal-transport", defaultProps, ((props, component) => {
    const $Root = component.element;
    (0, solid_js_1.onMount)(() => {
        (0, ManagerInstance_1.Manager)().send({ type: "REGISTER_TRANSPORT", destinationID: props.to, entranceID: props.name, $: $Root });
    });
    (0, solid_js_1.onCleanup)(() => {
        (0, ManagerInstance_1.Manager)().send({ type: "UNREGISTER_TRANSPORT", destinationID: props.to, entranceID: props.name });
    });
    return <slot />;
}));
//# sourceMappingURL=Transport.jsx.map