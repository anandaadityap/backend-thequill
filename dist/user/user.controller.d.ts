import { UserService } from './user.service';
import { EditUserRequestDto, EditUserResponseDto } from 'src/dto/user.dto';
import { WebResponse } from 'src/dto/web.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    updateUser(req: any, body: EditUserRequestDto): Promise<WebResponse<EditUserResponseDto>>;
    getUserById(req: any): Promise<{
        meta: {
            code: number;
            message: string;
            status: string;
        };
        data: {
            id: string;
            username: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
            biodata: string | null;
            avatar_url: string | null;
            created_at: Date;
            updated_at: Date;
            deleted_at: Date | null;
        };
    }>;
}
