import type { Props as _Props } from "./Props";
export declare namespace Props {
    export type Destination = Required<_Props.Destination>;
    export type Entrance = Required<Omit<_Props.Entrance, "children">>;
    type Destination_ID = Pick<Destination, ("name")>;
    type Entrance_ID = Pick<Entrance, ("name" | "to")>;
    export namespace Destination {
        type Create = Destination;
        type Connect = Destination_ID;
        type Disconnect = Destination_ID;
    }
    export namespace Entrance {
        type Create = Entrance;
        type Connect = Entrance_ID;
        type Disconnect = Entrance_ID;
    }
    export namespace Transport {
        type Create = Entrance;
        type Connect = Entrance_ID;
        type Disconnect = Entrance_ID;
    }
    export {};
}
//# sourceMappingURL=Registry.d.ts.map