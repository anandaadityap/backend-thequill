import { AuthService } from './auth.service';
import { LoginRequestDto, LoginResponseDto, RegisterRequestDto, UserResponseDto } from 'src/dto/auth.dto';
import { WebResponse } from 'src/dto/web.dto';
import { Response, Request } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerUser(body: RegisterRequestDto): Promise<WebResponse<UserResponseDto>>;
    loginUser(body: LoginRequestDto, response: Response): Promise<WebResponse<LoginResponseDto>>;
    refreshToken(request: Request): Promise<WebResponse<LoginResponseDto>>;
    logoutUser(req: Request, res: Response): Promise<WebResponse<any>>;
}
