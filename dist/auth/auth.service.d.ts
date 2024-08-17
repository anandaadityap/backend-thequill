import { LoginRequestDto, RegisterRequestDto, UserResponseDto } from 'src/dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
export declare class AuthService {
    private userService;
    private jwtService;
    private prismaService;
    constructor(userService: UserService, jwtService: JwtService, prismaService: PrismaService);
    register(registerRequest: RegisterRequestDto): Promise<UserResponseDto>;
    login(loginRequest: LoginRequestDto): Promise<any>;
    validateUser(loginRequest: LoginRequestDto): Promise<{
        id: string;
        username: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        biodata: string | null;
        avatar_url: string | null;
        refresh_token: string | null;
        created_at: Date;
        updated_at: Date;
        deleted_at: Date | null;
    }>;
    refreshToken(refreshToken: string): Promise<string>;
    logout(refreshToken: string): Promise<{
        id: string;
        username: string;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        biodata: string | null;
        avatar_url: string | null;
        refresh_token: string | null;
        created_at: Date;
        updated_at: Date;
        deleted_at: Date | null;
    }>;
}
