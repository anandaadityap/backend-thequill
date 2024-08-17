export declare class RequestContentDto {
    title: string;
    subject: string;
    article: string;
    image_banner?: string;
}
export declare class ResponseContentDto {
    id: string;
    title: string;
    subject: string;
    article: string;
    user_id: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}
