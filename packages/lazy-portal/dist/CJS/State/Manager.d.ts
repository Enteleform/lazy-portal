/// <reference types="react" />
/// <reference types="web" />
import { Destination } from "./Destination";
import { Entrance } from "./Entrance";
import { Transport } from "./Transport";
import { Props } from "../Types/Props";
import { Payload as _Payload } from "../Utilities/XState";
import { Interpreter } from "xstate";
export declare namespace Manager {
    type TransferPayload<Type extends string> = {
        type: Type;
    } & {
        destinationID: string;
        entranceID: string;
        mode: ("Automatic" | "Manual");
    };
    type Context = (typeof context);
    const context: {
        destinations: EntityMap<Destination.Service>;
        entranceGroups: NestedEntityMap<Entrance.Service>;
        transportGroups: NestedEntityMap<Transport.Service>;
    };
    type Payload = _Payload.Map<Event>;
    type Event = {
        type: "REGISTER_DESTINATION";
        $: HTMLElement;
        destinationID: string;
        defaultPosition: Props.Destination["defaultPosition"];
        transferMode: Props.Destination["transferMode"];
    } | {
        type: "REGISTER_ENTRANCE";
        $: HTMLElement;
        destinationID: string;
        entranceID: string;
        position: Props.Entrance["position"];
    } | {
        type: "REGISTER_TRANSPORT";
        $: HTMLElement;
        destinationID: string;
        entranceID: string;
    } | {
        type: "UNREGISTER_DESTINATION";
        destinationID: string;
        unmountMode: Props.Destination["unmountMode"];
    } | {
        type: "UNREGISTER_ENTRANCE";
        destinationID: string;
        entranceID: string;
    } | {
        type: "UNREGISTER_TRANSPORT";
        destinationID: string;
        entranceID: string;
    } | TransferPayload<"TRANSFER_TO_DESTINATION"> | TransferPayload<"TRANSFER_TO_ENTRANCE">;
    type Machine = (typeof machine);
    const machine: import("xstate").StateMachine<{
        destinations: EntityMap<Destination.Service>;
        entranceGroups: NestedEntityMap<Entrance.Service>;
        transportGroups: NestedEntityMap<Transport.Service>;
    }, any, Event, {
        value: any;
        context: {
            destinations: EntityMap<Destination.Service>;
            entranceGroups: NestedEntityMap<Entrance.Service>;
            transportGroups: NestedEntityMap<Transport.Service>;
        };
    }, import("xstate").BaseActionObject, import("xstate").ServiceMap, import("xstate").ResolveTypegenMeta<import("xstate").TypegenDisabled, Event, import("xstate").BaseActionObject, import("xstate").ServiceMap>>;
}
declare type Entity<T extends Interpreter<any, any, any, any, any>> = {
    service: T;
    $: WeakRef<HTMLElement>;
};
declare type EntityMap<T extends Interpreter<any, any, any, any, any>> = Map<string, Entity<T>>;
declare type NestedEntityMap<T extends Interpreter<any, any, any, any, any>> = Map<string, EntityMap<T>>;
export {};
//# sourceMappingURL=Manager.d.ts.map