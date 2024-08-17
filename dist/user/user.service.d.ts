import { PrismaService } from 'src/prisma.service';
import { RegisterRequestDto, UserResponseDto } from 'src/dto/auth.dto';
import { EditUserRequestDto, EditUserResponseDto } from 'src/dto/user.dto';
export declare class UserService {
    private prismaService;
    constructor(prismaService: PrismaService);
    createUser(registerRequest: RegisterRequestDto): Promise<UserResponseDto>;
    findByEmail(email: string): Promise<{
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
    findByUsername(username: string): Promise<{
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
    editUser(userId: string, editUserRequest: EditUserRequestDto): Promise<EditUserResponseDto>;
    findById(id: string): Promise<{
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
