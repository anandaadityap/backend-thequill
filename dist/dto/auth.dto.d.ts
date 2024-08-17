export declare class RegisterRequestDto {
    username: string;
    email: string;
    password: string;
}
export declare class UserResponseDto {
    username: string;
    email: string;
    password?: string;
    role: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}
export declare class LoginRequestDto {
    email: string;
    password: string;
    access_token?: string;
}
export declare class LoginResponseDto {
    access_token: string;
}
export declare class PayloadJwtDto {
    id: string;
    name: string;
    email: string;
    role: string;
}
