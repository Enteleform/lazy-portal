"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transfer_DOM_Node = exports.ensure_Storage = exports.ensure_Element = exports.create_Element_From_HTML = exports.create_Element = exports.ResourceTags = void 0;
//###  Module  ###//
const Selectors_1 = require("./Selectors");
//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//
exports.ResourceTags = [
    "LINK",
    "SCRIPT",
];
function create_Element({ attributes, className, tag, $Container }) {
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
exports.create_Element = create_Element;
function create_Element_From_HTML(text) {
    var $ = document.createElement("div");
    $.innerHTML = text.trim();
    return $.firstChild;
}
exports.create_Element_From_HTML = create_Element_From_HTML;
function ensure_Element({ attributes, className, selector, tag, $Container }) {
    let $ = $Container.querySelector(selector);
    $ !== null && $ !== void 0 ? $ : ($ = create_Element({ attributes, className, tag, $Container }));
    return $;
}
exports.ensure_Element = ensure_Element;
function ensure_Storage({ destinationID }) {
    const $Root = ensure_Element({ selector: Selectors_1.Tag.Root, tag: Selectors_1.Tag.Root, $Container: document.body });
    return {
        $Entrances: ensure_Element({
            $Container: $Root,
            selector: Selectors_1.Selector.Entrances({ destinationID }),
            tag: Selectors_1.Tag.Entrances,
            attributes: { destination: destinationID },
        }),
    };
}
exports.ensure_Storage = ensure_Storage;
function transfer_DOM_Node({ target, to }) {
    const $Target = document.querySelector(target);
    const $To = document.querySelector(to);
    $To.appendChild($Target);
}
exports.transfer_DOM_Node = transfer_DOM_Node;
//# sourceMappingURL=DOM.js.map