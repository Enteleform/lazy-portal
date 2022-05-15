export declare namespace Props {
    type Destination = {
        name: string;
        transferMode?: ("Single" | "Multiple");
        unmountMode?: ("Destroy" | "Persist");
        defaultPosition: Exclude<Props.Entrance["position"], number>;
    };
    namespace Destination {
        const Default: Partial<Destination>;
    }
}
export declare namespace Props {
    type Entrance = {
        /** `name` of target `Portal.Destination`. */
        to: string;
        /**
        * Unique name, defaults to the provided `to` value.
        *
        * Provide a static value when using:
        * - {transferMode:"Multiple"}
        * - manual portal management utilities
        */
        name?: string;
        position?: (number | "First" | "Last");
    };
}
export declare namespace Props {
    type Transport = {
        /** `name` of target `Portal.Destination`. */
        to: string;
        /**
        * Unique name, defaults to generated value.
        *
        * Provide a static value when using manual portal management utilities.
        */
        name?: string;
    };
}
//# sourceMappingURL=Props.d.ts.map