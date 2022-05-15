"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entrance = void 0;
//###  NPM  ###//
const xstate_1 = require("xstate");
//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//
var Entrance;
(function (Entrance) {
    Entrance.machine = (0, xstate_1.createMachine)(
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
})(Entrance = exports.Entrance || (exports.Entrance = {}));
//# sourceMappingURL=Entrance.js.map