//###  NPM  ###//
import { createMachine } from "xstate";
//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//
export var Destination;
(function (Destination) {
    Destination.machine = createMachine(
    //--------------------------------------------------------------------------------------------------------------//
    //  Config                                                                                                      //
    //--------------------------------------------------------------------------------------------------------------//
    {
        id: "Portal.Destination",
        type: "parallel",
        states: {
            Connection: {
                initial: "Connected",
                states: {
                    Connected: { on: { DISCONNECT: { target: "Disconnected" } } },
                    Disconnected: { on: { CONNECT: { target: "Connected" } } },
                },
            },
            Availability: {
                initial: "Open",
                states: {
                    Open: { on: { TRANSFER_TO_DESTINATION: { cond: "transferMode_Is_Single", target: "Closed" } } },
                    Closed: { on: { TRANSFER_TO_ENTRANCE: { cond: "transferMode_Is_Single", target: "Open" } } },
                },
            },
        },
    }, 
    //--------------------------------------------------------------------------------------------------------------//
    //  Options                                                                                                     //
    //--------------------------------------------------------------------------------------------------------------//
    {
        guards: {
            transferMode_Is_Single: (({ transferMode }) => (transferMode === "Single")),
        },
    });
})(Destination || (Destination = {}));
//# sourceMappingURL=Destination.js.map