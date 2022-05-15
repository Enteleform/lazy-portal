//###  Module  ###//
import { Selector, Tag } from "./Selectors";
//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//
export const ResourceTags = [
    "LINK",
    "SCRIPT",
];
export function create_Element({ attributes, className, tag, $Container }) {
    tag !== null && tag !== void 0 ? tag : (tag = "div");
    const $ = document.createElement(tag);
    if (className) {
        $.className = className;
    }
    if (attributes) {
        for (const [key, value] of Object.entries(attributes)) {
            $.setAttribute(key, value);
        }
    }
    $Container.appendChild($);
    return $;
}
export function create_Element_From_HTML(text) {
    var $ = document.createElement("div");
    $.innerHTML = text.trim();
    return $.firstChild;
}
export function ensure_Element({ attributes, className, selector, tag, $Container }) {
    let $ = $Container.querySelector(selector);
    $ !== null && $ !== void 0 ? $ : ($ = create_Element({ attributes, className, tag, $Container }));
    return $;
}
export function ensure_Storage({ destinationID }) {
    const $Root = ensure_Element({ selector: Tag.Root, tag: Tag.Root, $Container: document.body });
    return {
        $Entrances: ensure_Element({
            $Container: $Root,
            selector: Selector.Entrances({ destinationID }),
            tag: Tag.Entrances,
            attributes: { destination: destinationID },
        }),
    };
}
export function transfer_DOM_Node({ target, to }) {
    const $Target = document.querySelector(target);
    const $To = document.querySelector(to);
    $To.appendChild($Target);
}
//# sourceMappingURL=DOM.js.map