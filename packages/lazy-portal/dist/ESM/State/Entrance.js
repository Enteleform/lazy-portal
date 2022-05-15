//###  NPM  ###//
import { createMachine } from "xstate";
//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//
export var Entrance;
(function (Entrance) {
    Entrance.machine = createMachine(
    //--------------------------------------------------------------------------------------------------------------//
    //  Config                                                                                                      //
    //--------------------------------------------------------------------------------------------------------------//
    {
        id: "Portal.Entrance",
        type: "parallel",
        states: {
            Connection: {
                initial: "Connected",
                states: {
                    Connected: { on: { DISCONNECT: { target: "Disconnected" } } },
                    Disconnected: { on: { CONNECT: { target: "Connected" } } },
                },
            },
        },
    });
})(Entrance || (Entrance = {}));
//# sourceMappingURL=Entrance.js.map