export declare type Payload<Event extends {
    type: string;
}, Key extends Event["type"] = Event["type"]> = Extract<Event, {
    type: Key;
}>;
export declare namespace Payload {
    type WithoutType<Event extends {
        type: string;
    }, Key extends Event["type"] = Event["type"]> = Omit<Payload<Event, Key>, "type">;
    type Map<Event extends {
        type: string;
    }> = {
        [K in Event["type"]]: Extract<Event, {
            type: K;
        }>;
    };
}
//# sourceMappingURL=Payload.d.ts.map