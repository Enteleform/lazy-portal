import { Props as _Props } from "../Types/Props";
import { Interpreter } from "xstate";
import Props = _Props.Entrance;
export declare namespace Entrance {
    type Event = {
        type: "CONNECT";
    } | {
        type: "DISCONNECT";
    };
    type Context = {
        entranceID: string;
        destinationID: string;
        position: Props["position"];
    };
    type Service = Interpreter<Context, any, Event, any, any>;
    type Machine = (typeof machine);
    const machine: import("xstate").StateMachine<Context, any, Event, {
        value: any;
        context: Context;
    }, import("xstate").BaseActionObject, import("xstate").ServiceMap, import("xstate").ResolveTypegenMeta<import("xstate").TypegenDisabled, Event, import("xstate").BaseActionObject, import("xstate").ServiceMap>>;
}
//# sourceMappingURL=Entrance.d.ts.map