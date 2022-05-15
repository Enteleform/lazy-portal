import type { Manager } from "../State/Manager";
declare const _Error: ErrorConstructor;
export declare namespace Error {
    class Duplicate_DestinationID extends _Error {
        static ErrorName: string;
        name: string;
        constructor({ destinationID }: {
            destinationID: string;
        });
    }
    class Duplicate_EntranceID extends _Error {
        static ErrorName: string;
        name: string;
        constructor({ entranceID }: {
            entranceID: string;
        });
    }
    class TransferError extends _Error {
        static ErrorName: string;
        name: string;
        constructor({ context, event }: {
            context: Manager.Context;
            event: Manager.TransferPayload<any>;
        });
    }
    class Destination_Occupied extends _Error {
        static ErrorName: string;
        name: string;
        constructor({ destinationID }: {
            destinationID: string;
        });
    }
}
export {};
//# sourceMappingURL=index.d.ts.map