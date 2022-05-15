"use strict";
//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//
Object.defineProperty(exports, "__esModule", { value: true });
exports.guards = void 0;
var guards;
(function (guards_1) {
    function every(...guards) {
        return function every(context, event, meta) {
            return guards.every((guard) => {
                if (typeof guard === "string") {
                    return meta.state.machine.options.guards[guard](context, event, meta);
                }
                else {
                    let result = true;
                    for (const [guardKey, isTrue] of Object.entries(guard)) {
                        const guardValue = meta.state.machine.options.guards[guardKey](context, event, meta);
                        result = (result && (false
                            || (isTrue && guardValue)
                            || (!isTrue && !guardValue)));
                    }
                    return result;
                }
            });
        };
    }
    guards_1.every = every;
    function some(...guards) {
        return function some(context, event, meta) {
            return guards.some((guard) => {
                if (typeof guard === "string") {
                    return meta.state.machine.options.guards[guard](context, event, meta);
                }
                else {
                    let result = false;
                    for (const [guardKey, isTrue] of Object.entries(guard)) {
                        const guardValue = meta.state.machine.options.guards[guardKey](context, event, meta);
                        result = (result || (false
                            || (isTrue && guardValue)
                            || (!isTrue && !guardValue)));
                    }
                    return result;
                }
            });
        };
    }
    guards_1.some = some;
    function none(...guards) {
        return function none(context, event, meta) { return !some(...guards)(context, event, meta); };
    }
    guards_1.none = none;
})(guards = exports.guards || (exports.guards = {}));
//# sourceMappingURL=Guards.js.map