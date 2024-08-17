export declare class WebResponse<T> {
    meta: Meta;
    data?: T;
    errors?: string;
}
declare class Meta {
    code: number;
    message: string;
    status: string;
}
export {};
