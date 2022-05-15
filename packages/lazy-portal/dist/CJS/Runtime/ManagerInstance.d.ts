/// <reference types="react" />
/// <reference types="web" />
import { Manager as _Manager } from "../State/Manager";
export declare function Manager(): {
    send: (event: import("xstate").SCXML.Event<_Manager.Event> | import("xstate").SingleOrArray<import("xstate").Event<_Manager.Event>>, payload?: import("xstate").EventData) => import("xstate").State<{
        destinations: Map<string, {
            service: import("../State/Destination").Destination.Service;
            $: WeakRef<HTMLElement>;
        }>;
        entranceGroups: Map<string, Map<string, {
            service: import("../State/Entrance").Entrance.Service;
            $: WeakRef<HTMLElement>;
        }>>;
        transportGroups: Map<string, Map<string, {
            service: import("../State/Transport").Transport.Service;
            $: WeakRef<HTMLElement>;
        }>>;
    }, _Manager.Event, any, {
        value: any;
        context: {
            destinations: Map<string, {
                service: import("../State/Destination").Destination.Service;
                $: WeakRef<HTMLElement>;
            }>;
            entranceGroups: Map<string, Map<string, {
                service: import("../State/Entrance").Entrance.Service;
                $: WeakRef<HTMLElement>;
            }>>;
            transportGroups: Map<string, Map<string, {
                service: import("../State/Transport").Transport.Service;
                $: WeakRef<HTMLElement>;
            }>>;
        };
    }, import("xstate").ResolveTypegenMeta<import("xstate").TypegenDisabled, _Manager.Event, import("xstate").BaseActionObject, import("xstate").ServiceMap>>;
};
//# sourceMappingURL=ManagerInstance.d.ts.map