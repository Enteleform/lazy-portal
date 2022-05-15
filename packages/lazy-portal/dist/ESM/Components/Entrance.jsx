/** @jsxImportSource solid-js */
//###  Module  ###//
import { Manager } from "../Runtime/ManagerInstance";
import { create_Element_From_HTML, ensure_Storage, ResourceTags, } from "../Utilities/DOM";
//###  NPM  ###//
import { customElement } from "solid-element";
import { onMount, onCleanup } from "solid-js";
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
customElement("portal-entrance", defaultProps, ((props, component) => {
    var _a;
    const $Root = component.element;
    const name = ((_a = props.name) !== null && _a !== void 0 ? _a : props.to);
    $Root.setAttribute("name", name);
    let placingContents = false;
    onMount(() => {
        place_Contents();
        Manager().send({ type: "REGISTER_ENTRANCE", destinationID: props.to, entranceID: name, position: props.position, $: $Root });
    });
    onCleanup(() => {
        if (placingContents) {
            return;
        }
        Manager().send({ type: "UNREGISTER_ENTRANCE", destinationID: props.to, entranceID: name });
    });
    function place_Contents() {
        placingContents = true;
        const $TransportContents = [...$Root.childNodes]
            .filter(($) => !ResourceTags.includes($.tagName));
        const { $Entrances } = ensure_Storage({ destinationID: props.to });
        const $Transport = create_Element_From_HTML(`<portal-transport to="${props.to}" name="${name}"/>`);
        $Transport.append(...$TransportContents);
        $Root.appendChild($Transport);
        $Entrances.appendChild($Root);
        placingContents = false;
    }
    return <slot />;
}));
//# sourceMappingURL=Entrance.jsx.map