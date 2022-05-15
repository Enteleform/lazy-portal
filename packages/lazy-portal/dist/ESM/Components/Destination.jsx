/** @jsxImportSource solid-js */
//###  Module  ###//
import { Manager } from "../Runtime/ManagerInstance";
import { Props as _Props } from "../Types/Props";
//###  NPM  ###//
import { customElement } from "solid-element";
import { onMount, onCleanup } from "solid-js";
//####################################################################################################################//
//##>  Aliases                                                                                                      ##//
//####################################################################################################################//
var Props = _Props.Destination;
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
customElement("portal-destination", defaultProps, ((props, component) => {
    const $Root = component.element;
    onMount(() => {
        Manager().send({ type: "REGISTER_DESTINATION", destinationID: props.name, defaultPosition: props.defaultPosition, transferMode: props.transferMode, $: $Root });
    });
    onCleanup(() => {
        Manager().send({ type: "UNREGISTER_DESTINATION", destinationID: props.name, unmountMode: props.unmountMode });
    });
    return <slot />;
}));
//# sourceMappingURL=Destination.jsx.map