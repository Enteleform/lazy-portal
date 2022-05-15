"use strict";
/** @jsxImportSource solid-js */
Object.defineProperty(exports, "__esModule", { value: true });
//###  Module  ###//
const ManagerInstance_1 = require("../Runtime/ManagerInstance");
const Props_1 = require("../Types/Props");
//###  NPM  ###//
const solid_element_1 = require("solid-element");
const solid_js_1 = require("solid-js");
//####################################################################################################################//
//##>  Aliases                                                                                                      ##//
//####################################################################################################################//
var Props = Props_1.Props.Destination;
//####################################################################################################################//
//##>  WebComponent.Properties                                                                                      ##//
//####################################################################################################################//
const defaultProps = {
    name: undefined,
    transferMode: Props.Default.transferMode,
    unmountMode: Props.Default.unmountMode,
    defaultPosition: Props.Default.defaultPosition,
};
//####################################################################################################################//
//##>  WebComponent.Initialize                                                                                      ##//
//####################################################################################################################//
(0, solid_element_1.customElement)("portal-destination", defaultProps, ((props, component) => {
    const $Root = component.element;
    (0, solid_js_1.onMount)(() => {
        (0, ManagerInstance_1.Manager)().send({ type: "REGISTER_DESTINATION", destinationID: props.name, defaultPosition: props.defaultPosition, transferMode: props.transferMode, $: $Root });
    });
    (0, solid_js_1.onCleanup)(() => {
        (0, ManagerInstance_1.Manager)().send({ type: "UNREGISTER_DESTINATION", destinationID: props.name, unmountMode: props.unmountMode });
    });
    return <slot />;
}));
//# sourceMappingURL=Destination.jsx.map