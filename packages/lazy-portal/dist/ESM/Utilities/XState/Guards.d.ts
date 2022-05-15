export declare namespace guards {
    function every(...guards: Guard[]): (context: any, event: any, meta: any) => boolean;
    function some(...guards: Guard[]): (context: any, event: any, meta: any) => boolean;
    function none(...guards: Guard[]): (context: any, event: any, meta: any) => boolean;
}
declare type Guard = string | Record<string, boolean>;
export {};
//# sourceMappingURL=Guards.d.ts.map