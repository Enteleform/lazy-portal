"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error = void 0;
//####################################################################################################################//
//##>  Aliases                                                                                                      ##//
//####################################################################################################################//
const _Error = globalThis.Error;
//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//
var Error;
(function (Error) {
    class Duplicate_DestinationID extends _Error {
        constructor({ destinationID }) {
            super();
            this.name = "LazyPortal.Duplicate_DestinationID";
            this.message = (""
                + `\n`
                + `\n  Portal Destination with ID \`${destinationID}\` already exists.\n`);
        }
    }
    Duplicate_DestinationID.ErrorName = "LazyPortal.Duplicate_DestinationID";
    Error.Duplicate_DestinationID = Duplicate_DestinationID;
    class Duplicate_EntranceID extends _Error {
        constructor({ entranceID }) {
            super();
            this.name = "LazyPortal.Duplicate_EntranceID";
            this.message = (""
                + `\n`
                + `\n  Portal Entrance with ID \`${entranceID}\` already exists.\n`);
        }
    }
    Duplicate_EntranceID.ErrorName = "LazyPortal.Duplicate_EntranceID";
    Error.Duplicate_EntranceID = Duplicate_EntranceID;
    class TransferError extends _Error {
        constructor({ context, event }) {
            super();
            this.name = "LazyPortal.TransferError";
            this.message = (""
                + `\n`
                + `\n  ${JSON.stringify({ context, event })}\n`);
        }
    }
    TransferError.ErrorName = "LazyPortal.TransferError";
    Error.TransferError = TransferError;
    class Destination_Occupied extends _Error {
        constructor({ destinationID }) {
            super();
            this.name = "LazyPortal.Destination_Occupied";
            this.message = (""
                + `\n`
                + `\n  Portal Destination with ID \`${destinationID}\` is already occupied.\n`
                + `\n  Use \`transfer-mode="Multiple"\` to allow multiple occupants.\n`);
        }
    }
    Destination_Occupied.ErrorName = "LazyPortal.Destination_Occupied";
    Error.Destination_Occupied = Destination_Occupied;
})(Error = exports.Error || (exports.Error = {}));
//# sourceMappingURL=index.js.map