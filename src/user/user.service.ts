import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RegisterRequestDto, UserResponseDto } from 'src/dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { EditUserRequestDto, EditUserResponseDto } from 'src/dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async createUser(
    registerRequest: RegisterRequestDto,
  ): Promise<UserResponseDto> {
    const usernameExists = await this.findByUsername(registerRequest.username);
    if (usernameExists) throw new HttpException('username already exists', 409);

    const emailExists = await this.findByEmail(registerRequest.email);
    if (emailExists) throw new HttpException('email already exists', 409);

    const newUser = await this.prismaService.user.create({
      data: {
        ...registerRequest,
        password: await bcrypt.hash(registerRequest.password, 10),
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, password, ...result } = newUser;

    return result;
  }

  async findByEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async findByUsername(username: string) {
    const user = await this.prismaService.user.findUnique({
      where: { username },
    });
    return user;
  }

  async editUser(
    userId: string,
    editUserRequest: EditUserRequestDto,
  ): Promise<EditUserResponseDto> {
    const updatedUser = await this.prismaService.user.update({
      where: { id: userId },
      data: {
        ...editUserRequest,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, refresh_token, ...result } = updatedUser;

    return result;
  }

  async findById(id: string) {
    return this.prismaService.user.findUnique({ where: { id } });
  }
}
