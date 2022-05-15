/// <reference types="react" />
/// <reference types="web" />
export declare const ResourceTags: string[];
export declare function create_Element({ attributes, className, tag, $Container }: {
    attributes?: Record<string, string>;
    className?: string;
    tag?: string;
    $Container: HTMLElement;
}): HTMLElement;
export declare function create_Element_From_HTML(text: string): HTMLElement;
export declare function ensure_Element({ attributes, className, selector, tag, $Container }: {
    attributes?: Record<string, string>;
    className?: string;
    selector: string;
    tag?: string;
    $Container: HTMLElement;
}): HTMLElement;
export declare function ensure_Storage({ destinationID }: {
    destinationID: string;
}): {
    $Entrances: HTMLElement;
};
export declare function transfer_DOM_Node({ target, to }: {
    target: string;
    to: string;
}): void;
//# sourceMappingURL=DOM.d.ts.map