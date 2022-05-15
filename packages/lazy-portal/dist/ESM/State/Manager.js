//###  Module  ###//
import { Destination } from "./Destination";
import { Entrance } from "./Entrance";
import { Transport } from "./Transport";
import { Error } from "../Error/index";
//###  NPM  ###//
import { createMachine, interpret, } from "xstate";
//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//
export var Manager;
(function (Manager) {
    Manager.context = {
        destinations: new Map(),
        entranceGroups: new Map(),
        transportGroups: new Map(),
    };
    Manager.machine = createMachine(
    //----------------------------------------------------------------------------------------------------------------//
    //  Config                                                                                                        //
    //----------------------------------------------------------------------------------------------------------------//
    {
        context: Manager.context,
        id: "Portal-Manager",
        on: {
            //------------------------------------------------------------------------------------------------------------//
            //  Registration                                                                                              //
            //------------------------------------------------------------------------------------------------------------//
            REGISTER_DESTINATION: { actions: ((context, { type, $, ...event }) => {
                    const { destinations, transportGroups } = context;
                    const { destinationID } = event;
                    //###  Register  ###//
                    if (destinations.has(destinationID)) {
                        throw new Error.Duplicate_DestinationID({ destinationID });
                    }
                    const service = interpret(Destination.machine.withConfig({}, event));
                    service.start();
                    destinations.set(destinationID, { service, $: new WeakRef($) });
                    //###  Claim  ###//
                    const transports = transportGroups.get(destinationID);
                    if (transports) {
                        for (const transport of transports.values()) {
                            transport.service.send({ type: "CLAIM" });
                        }
                    }
                }) },
            REGISTER_ENTRANCE: { actions: ((context, { type, $, ...event }) => {
                    const { entranceGroups } = context;
                    const { destinationID, entranceID } = event;
                    if ([...entranceGroups.values()].some(group => group.has(entranceID))) {
                        throw new Error.Duplicate_EntranceID({ entranceID });
                    }
                    const service = interpret(Entrance.machine.withConfig({}, event));
                    service.start();
                    if (!entranceGroups.has(destinationID)) {
                        entranceGroups.set(destinationID, new Map());
                    }
                    const entrances = entranceGroups.get(destinationID);
                    entrances.set(entranceID, { service, $: new WeakRef($) });
                }) },
            REGISTER_TRANSPORT: { actions: ((context, { type, $, ...event }) => {
                    const { destinations, transportGroups } = context;
                    const { destinationID, entranceID } = event;
                    //###  Register  ###//
                    const service = interpret(Transport.machine.withConfig({}, event));
                    service.start();
                    if (!transportGroups.has(destinationID)) {
                        transportGroups.set(destinationID, new Map());
                    }
                    const transports = transportGroups.get(destinationID);
                    transports.set(entranceID, { service, $: new WeakRef($) });
                    //###  Claim  ###//
                    const destination = destinations.get(destinationID);
                    if (destination === null || destination === void 0 ? void 0 : destination.service) {
                        service.send({ type: "CLAIM" });
                    }
                }) },
            UNREGISTER_DESTINATION: { actions: ((context, { type, ...event }) => {
                    var _a;
                    const { destinations, transportGroups } = context;
                    const { destinationID } = event;
                    //###  Unregister  ###//
                    const service = (_a = destinations.get(event.destinationID)) === null || _a === void 0 ? void 0 : _a.service;
                    service === null || service === void 0 ? void 0 : service.stop();
                    destinations.delete(event.destinationID);
                    //###  Unclaim  ###//
                    const transports = transportGroups.get(destinationID);
                    if (transports) {
                        for (const transport of transports.values()) {
                            transport.service.send({
                                type: ((event.unmountMode === "Persist") ? "UNCLAIM" : "DESTROY")
                            });
                        }
                    }
                }) },
            UNREGISTER_ENTRANCE: { actions: (({ entranceGroups }, { type, ...event }) => {
                    var _a;
                    const entrances = entranceGroups.get(event.destinationID);
                    const service = (_a = entrances.get(event.entranceID)) === null || _a === void 0 ? void 0 : _a.service;
                    service === null || service === void 0 ? void 0 : service.stop();
                    entrances.delete(event.entranceID);
                }) },
            UNREGISTER_TRANSPORT: { actions: (({ transportGroups }, { type, ...event }) => {
                    var _a;
                    const transports = transportGroups.get(event.destinationID);
                    const service = (_a = transports.get(event.entranceID)) === null || _a === void 0 ? void 0 : _a.service;
                    service === null || service === void 0 ? void 0 : service.stop();
                    transports.delete(event.entranceID);
                }) },
            //------------------------------------------------------------------------------------------------------------//
            //  Transfer                                                                                                  //
            //------------------------------------------------------------------------------------------------------------//
            TRANSFER_TO_DESTINATION: [
                { cond: "can_AutomaticTransfer_To_Destination", actions: "transfer_To_Destination" },
                { cond: "can_ManualTransfer_To_Destination", actions: "transfer_To_Destination" },
                { cond: "has_DestinationOccupied_Error", actions: "throw_DestinationOccupied_Error" },
            ],
            TRANSFER_TO_ENTRANCE: [
                { cond: "can_AutomaticTransfer_To_Entrance", actions: "transfer_To_Entrance" },
                { cond: "can_ManualTransfer_To_Entrance", actions: "transfer_To_Entrance" },
            ],
        },
    }, 
    //----------------------------------------------------------------------------------------------------------------//
    //  Options                                                                                                       //
    //----------------------------------------------------------------------------------------------------------------//
    {
        actions: {
            transfer_To_Destination(context, event) {
                var _a;
                const { destination, entrance, transport } = get_Services({ context, event });
                const $Destination = destination.$.deref();
                const $Transport = transport.$.deref();
                const position = ((_a = entrance.service.state.context.position) !== null && _a !== void 0 ? _a : destination.service.state.context.defaultPosition);
                destination.service.send("TRANSFER_TO_DESTINATION");
                transport.service.send("TRANSFER_TO_DESTINATION");
                if (position === "First") {
                    $Destination.prepend($Transport);
                }
                else if (position === "Last") {
                    $Destination.append($Transport);
                }
                else if (position >= $Destination.children.length) {
                    $Destination.append($Transport);
                }
                else {
                    $Destination.insertBefore($Transport, $Destination.children[position]);
                }
            },
            transfer_To_Entrance(context, event) {
                const { destination, entrance, transport } = get_Services({ context, event });
                destination === null || destination === void 0 ? void 0 : destination.service.send("TRANSFER_TO_ENTRANCE");
                transport.service.send("TRANSFER_TO_ENTRANCE");
                entrance.$.deref().append(transport.$.deref());
            },
            throw_DestinationOccupied_Error(context, event) {
                throw new Error.Destination_Occupied({ destinationID: event.destinationID });
            },
        },
        guards: {
            can_AutomaticTransfer_To_Destination(context, event) {
                const { destination, transport } = get_Services({ context, event });
                return (true
                    && (event.mode === "Automatic")
                    && (destination === null || destination === void 0 ? void 0 : destination.service.state.matches({ Connection: "Connected", Availability: "Open" }))
                    && (transport === null || transport === void 0 ? void 0 : transport.service.state.matches({ Claim: "Claimed", Connection: "Connected", Location: "Entrance", Management: "Automatic" })));
            },
            can_AutomaticTransfer_To_Entrance(context, event) {
                const { transport } = get_Services({ context, event });
                return (true
                    && (event.mode === "Automatic")
                    && (transport === null || transport === void 0 ? void 0 : transport.service.state.matches({ Connection: "Connected", Location: "Destination", Management: "Automatic" })));
            },
            can_ManualTransfer_To_Destination(context, event) {
                const { destination, transport } = get_Services({ context, event });
                return (true
                    && (event.mode === "Manual")
                    && (destination === null || destination === void 0 ? void 0 : destination.service.state.matches({ Connection: "Connected", Availability: "Open" }))
                    && (transport === null || transport === void 0 ? void 0 : transport.service.state.matches({ Claim: "Claimed", Connection: "Connected", Location: "Entrance", Management: "Manual" })));
            },
            can_ManualTransfer_To_Entrance(context, event) {
                const { transport } = get_Services({ context, event });
                return (true
                    && (event.mode === "Manual")
                    && (transport === null || transport === void 0 ? void 0 : transport.service.state.matches({ Claim: "Claimed", Connection: "Connected", Location: "Destination", Management: "Manual" })));
            },
            has_DestinationOccupied_Error(context, event) {
                var _a, _b, _c;
                const { destination, transport } = get_Services({ context, event });
                const destination_Is_Closed = (_a = destination.service) === null || _a === void 0 ? void 0 : _a.state.matches({ Connection: "Connected", Availability: "Closed" });
                return (false
                    || (true
                        && (event.mode === "Automatic")
                        && destination
                        && destination_Is_Closed
                        && ((_b = transport.service) === null || _b === void 0 ? void 0 : _b.state.matches({ Claim: "Claimed", Connection: "Connected", Location: "Entrance", Management: "Automatic" })))
                    || (true
                        && (event.mode === "Manual")
                        && destination
                        && destination_Is_Closed
                        && ((_c = transport.service) === null || _c === void 0 ? void 0 : _c.state.matches({ Claim: "Claimed", Connection: "Connected", Location: "Entrance", Management: "Manual" }))));
            },
        },
    });
})(Manager || (Manager = {}));
//####################################################################################################################//
//##>  Utilities                                                                                                    ##//
//####################################################################################################################//
function get_Services({ context: { destinations, entranceGroups, transportGroups }, event: { entranceID, destinationID } }) {
    const entrances = entranceGroups.get(destinationID);
    const transports = transportGroups.get(destinationID);
    return {
        entrances,
        transports,
        destination: destinations.get(destinationID),
        entrance: entrances === null || entrances === void 0 ? void 0 : entrances.get(entranceID),
        transport: transports === null || transports === void 0 ? void 0 : transports.get(entranceID),
    };
}
//# sourceMappingURL=Manager.js.map