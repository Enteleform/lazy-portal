import { Interpreter } from "xstate";
export declare namespace Transport {
    type Event = {
        type: "CONNECT";
    } | {
        type: "DISCONNECT";
    } | {
        type: "CLAIM";
    } | {
        type: "UNCLAIM";
    } | {
        type: "DESTROY";
    } | {
        type: "TRANSFER_TO_DESTINATION";
    } | {
        type: "TRANSFER_TO_ENTRANCE";
    };
    type Context = {
        entranceID: string;
        destinationID: string;
    };
    type Service = Interpreter<Context, any, Event, any, any>;
    type Machine = (typeof machine);
    const machine: import("xstate").StateMachine<Context, any, Event, {
        value: any;
        context: Context;
    }, import("xstate").BaseActionObject, import("xstate").ServiceMap, import("xstate").ResolveTypegenMeta<import("xstate").TypegenDisabled, Event, import("xstate").BaseActionObject, import("xstate").ServiceMap>>;
}
//# sourceMappingURL=Transport.d.ts.map