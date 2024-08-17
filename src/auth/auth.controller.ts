import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
  UserResponseDto,
} from 'src/dto/auth.dto';
import { WebResponse } from 'src/dto/web.dto';
import { Response, Request } from 'express';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async registerUser(
    @Body() body: RegisterRequestDto,
  ): Promise<WebResponse<UserResponseDto>> {
    const user = await this.authService.register(body);

    return {
      meta: {
        code: HttpStatus.CREATED,
        message: 'register successfully',
        status: 'success',
      },
      data: user,
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async loginUser(
    @Body() body: LoginRequestDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<WebResponse<LoginResponseDto>> {
    const { access_token, refresh_token } = await this.authService.login(body);

    response.cookie('refreshToken', refresh_token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return {
      meta: {
        code: HttpStatus.OK,
        message: 'login successfully',
        status: 'success',
      },
      data: { access_token: access_token },
    };
  }

  @Get('refresh-token')
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @Req() request: Request,
  ): Promise<WebResponse<LoginResponseDto>> {
    const refreshToken = request.cookies['refreshToken'];
    const accessToken = await this.authService.refreshToken(refreshToken);

    return {
      meta: {
        code: HttpStatus.OK,
        message: 'refresh token successfully',
        status: 'success',
      },
      data: { access_token: accessToken },
    };
  }

  @Delete('logout')
  @HttpCode(HttpStatus.OK)
  async logoutUser(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<WebResponse<any>> {
    const refreshToken = req.cookies['refreshToken'];

    await this.authService.logout(refreshToken);

    res.clearCookie('refreshToken');

    return {
      meta: {
        code: HttpStatus.OK,
        message: 'logout successfully',
        status: 'success',
      },
    };
  }
}
