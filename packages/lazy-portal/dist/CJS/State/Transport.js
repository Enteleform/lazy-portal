"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transport = void 0;
//###  Module  ###//
const ManagerInstance_1 = require("../Runtime/ManagerInstance");
//###  NPM  ###//
const xstate_1 = require("xstate");
//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//
var Transport;
(function (Transport) {
    Transport.machine = (0, xstate_1.createMachine)(
    //--------------------------------------------------------------------------------------------------------------//
    //  Config                                                                                                      //
    //--------------------------------------------------------------------------------------------------------------//
    {
        id: "Portal.Transport",
        type: "parallel",
        states: {
            Claim: {
                initial: "Unclaimed",
                states: {
                    Unclaimed: {
                        entry: (({ destinationID, entranceID }) => {
                            (0, ManagerInstance_1.Manager)().send({
                                type: "TRANSFER_TO_ENTRANCE",
                                mode: "Automatic",
                                destinationID,
                                entranceID,
                            });
                        }),
                        on: { CLAIM: { target: "Claimed" } },
                    },
                    Claimed: {
                        entry: (({ destinationID, entranceID }) => {
                            (0, ManagerInstance_1.Manager)().send({
                                type: "TRANSFER_TO_DESTINATION",
                                mode: "Automatic",
                                destinationID,
                                entranceID,
                            });
                        }),
                        on: {
                            DESTROY: { /* do nothing, unmount events will fire @ component */},
                            UNCLAIM: { target: "Unclaimed" },
                        },
                    },
                },
            },
            Connection: {
                initial: "Connected",
                states: {
                    Connected: { on: { DISCONNECT: { target: "Disconnected" } } },
                    Disconnected: { on: { CONNECT: { target: "Connected" } } },
                },
            },
            Location: {
                initial: "Entrance",
                states: {
                    Entrance: { on: { TRANSFER_TO_DESTINATION: { target: "Destination" } } },
                    Destination: { on: { TRANSFER_TO_ENTRANCE: { target: "Entrance" } } },
                },
            },
            Management: {
                initial: "Automatic",
                states: {
                    Automatic: {
                    /* ToDo */
                    },
                    Manual: {
                    /* ToDo */
                    },
                },
            },
        },
    });
})(Transport = exports.Transport || (exports.Transport = {}));
//# sourceMappingURL=Transport.js.map