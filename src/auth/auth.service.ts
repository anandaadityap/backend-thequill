import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  LoginRequestDto,
  RegisterRequestDto,
  UserResponseDto,
} from 'src/dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async register(
    registerRequest: RegisterRequestDto,
  ): Promise<UserResponseDto> {
    const newUser = this.userService.createUser(registerRequest);

    return newUser;
  }

  async login(loginRequest: LoginRequestDto): Promise<any> {
    const user = await this.validateUser(loginRequest);
    const payload = {
      id: user.id,
      name: user.username,
      email: user.email,
      role: user.role,
      avatar: user.avatar_url,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '60m',
      secret: process.env.JWT_SECRET_KEY,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '30d',
      secret: process.env.JWT_REFRESH_TOKEN,
    });

    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        refresh_token: refreshToken,
      },
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async validateUser(loginRequest: LoginRequestDto) {
    const user = await this.userService.findByEmail(loginRequest.email);
    if (user && compare(loginRequest.password, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException();
  }

  async refreshToken(refreshToken: string): Promise<string> {
    if (!refreshToken)
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);

    const user = await this.prismaService.user.findFirst({
      where: { refresh_token: refreshToken },
    });
    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);

    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_TOKEN,
      });
      const newPayload = {
        id: payload.id,
        name: payload.name,
        email: payload.email,
        role: payload.role,
        avatar: payload.avatar,
      };
      const accessToken = await this.jwtService.signAsync(newPayload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: '60m',
      });

      return accessToken;
    } catch (error) {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }
  }

  async logout(refreshToken: string) {
    if (!refreshToken)
      throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);

    const user = await this.prismaService.user.findFirst({
      where: { refresh_token: refreshToken },
    });

    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);

    return await this.prismaService.user.update({
      where: { id: user.id },
      data: { refresh_token: null },
    });
  }
}
