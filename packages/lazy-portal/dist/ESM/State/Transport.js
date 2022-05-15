//###  Module  ###//
import { Manager } from "../Runtime/ManagerInstance";
//###  NPM  ###//
import { createMachine } from "xstate";
//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//
export var Transport;
(function (Transport) {
    Transport.machine = createMachine(
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
                            Manager().send({
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
                            Manager().send({
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
})(Transport || (Transport = {}));
//# sourceMappingURL=Transport.js.map