//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//
export var Tag;
(function (Tag) {
    Tag.Destination = "portal-destination";
    Tag.Entrance = "portal-entrance";
    Tag.Entrances = "portal-entrances";
    Tag.Root = "portal-root";
    Tag.Transport = "portal-transport";
})(Tag || (Tag = {}));
export var Selector;
(function (Selector) {
    Selector.Entrances = (({ destinationID }) => (Tag.Entrances + `[destination="${destinationID}"]`));
})(Selector || (Selector = {}));
//# sourceMappingURL=Selectors.js.map