import { Props as _Props } from "../Types/Props";
import { Interpreter } from "xstate";
import Props = _Props.Destination;
export declare namespace Destination {
    type Event = {
        type: "CONNECT";
    } | {
        type: "DISCONNECT";
    } | {
        type: "TRANSFER_TO_DESTINATION";
    } | {
        type: "TRANSFER_TO_ENTRANCE";
    };
    type Context = {
        destinationID: string;
        transferMode: Props["transferMode"];
        defaultPosition: Props["defaultPosition"];
    };
    type Service = Interpreter<Context, any, Event, any, any>;
    type Machine = (typeof machine);
    const machine: import("xstate").StateMachine<Context, any, Event, {
        value: any;
        context: Context;
    }, import("xstate").BaseActionObject, import("xstate").ServiceMap, import("xstate").ResolveTypegenMeta<import("xstate").TypegenDisabled, Event, import("xstate").BaseActionObject, import("xstate").ServiceMap>>;
}
//# sourceMappingURL=Destination.d.ts.map