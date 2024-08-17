export declare class EditUserRequestDto {
    username?: string;
    email?: string;
    biodata?: string;
    avatar_url?: string;
}
export declare class EditUserResponseDto {
    id: string;
    username: string;
    email: string;
    biodata?: string;
    avatar_url?: string;
    role: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}
