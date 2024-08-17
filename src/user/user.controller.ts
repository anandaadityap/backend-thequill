import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { EditUserRequestDto, EditUserResponseDto } from 'src/dto/user.dto';
import { WebResponse } from 'src/dto/web.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Patch('update')
  async updateUser(
    @Req() req,
    @Body() body: EditUserRequestDto,
  ): Promise<WebResponse<EditUserResponseDto>> {
    const userUpdated = await this.userService.editUser(req.user.id, body);

    return {
      meta: {
        code: 200,
        message: 'update data successfully',
        status: 'success',
      },
      data: userUpdated,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserById(@Req() req) {
    const user = await this.userService.findById(req.user.id);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, refresh_token, ...result } = user;
    return {
      meta: {
        code: 200,
        message: 'update data successfully',
        status: 'success',
      },
      data: result,
    };
  }
}
