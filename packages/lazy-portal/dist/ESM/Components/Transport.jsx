/** @jsxImportSource solid-js */
//###  Module  ###//
import { Manager } from "../Runtime/ManagerInstance";
//###  NPM  ###//
import { customElement } from "solid-element";
import { onMount, onCleanup } from "solid-js";
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
customElement("portal-transport", defaultProps, ((props, component) => {
    const $Root = component.element;
    onMount(() => {
        Manager().send({ type: "REGISTER_TRANSPORT", destinationID: props.to, entranceID: props.name, $: $Root });
    });
    onCleanup(() => {
        Manager().send({ type: "UNREGISTER_TRANSPORT", destinationID: props.to, entranceID: props.name });
    });
    return <slot />;
}));
//# sourceMappingURL=Transport.jsx.map