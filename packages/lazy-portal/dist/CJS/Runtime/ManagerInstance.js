"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manager = void 0;
//###  Module  ###//
const Manager_1 = require("../State/Manager");
//###  NPM  ###//
const xstate_1 = require("xstate");
//####################################################################################################################//
//##>  Setup                                                                                                        ##//
//####################################################################################################################//
let singleton;
//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//
function Manager() {
    singleton !== null && singleton !== void 0 ? singleton : (singleton = initialize_Manager());
    return singleton;
}
exports.Manager = Manager;
//####################################################################################################################//
//##>  Core                                                                                                         ##//
//####################################################################################################################//
function initialize_Manager() {
    const manager = (0, xstate_1.interpret)(Manager_1.Manager.machine);
    manager.start();
    return {
        send: manager.send.bind(manager),
    };
}
//# sourceMappingURL=ManagerInstance.js.map