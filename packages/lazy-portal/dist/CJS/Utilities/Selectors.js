"use strict";
//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//
Object.defineProperty(exports, "__esModule", { value: true });
exports.Selector = exports.Tag = void 0;
var Tag;
(function (Tag) {
    Tag.Destination = "portal-destination";
    Tag.Entrance = "portal-entrance";
    Tag.Entrances = "portal-entrances";
    Tag.Root = "portal-root";
    Tag.Transport = "portal-transport";
})(Tag = exports.Tag || (exports.Tag = {}));
var Selector;
(function (Selector) {
    Selector.Entrances = (({ destinationID }) => (Tag.Entrances + `[destination="${destinationID}"]`));
})(Selector = exports.Selector || (exports.Selector = {}));
//# sourceMappingURL=Selectors.js.map