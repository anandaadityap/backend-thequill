import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { RequestCategoryDto, ResponseCategoryDto } from 'src/dto/category.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { WebResponse } from 'src/dto/web.dto';

@Controller('api/v1/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async CreateCategory(
    @Body() body: RequestCategoryDto,
  ): Promise<WebResponse<ResponseCategoryDto>> {
    const category = await this.categoryService.create(body);

    return {
      meta: {
        code: HttpStatus.CREATED,
        message: 'create category successfully',
        status: 'success',
      },
      data: category,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post(':categoryId')
  @HttpCode(HttpStatus.OK)
  async updateCategory(
    @Param('categoryId') categoryId: string,
    @Body()
    body: RequestCategoryDto,
  ): Promise<WebResponse<ResponseCategoryDto>> {
    const category = await this.categoryService.update(categoryId, body);

    return {
      meta: {
        code: HttpStatus.OK,
        message: 'update category successfully',
        status: 'success',
      },
      data: category,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllCategory(): Promise<WebResponse<ResponseCategoryDto[]>> {
    const category = await this.categoryService.findAll();

    return {
      meta: {
        code: HttpStatus.OK,
        message: 'update category successfully',
        status: 'success',
      },
      data: category,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:categoryId')
  @HttpCode(HttpStatus.OK)
  async deleteCategory(
    @Param('categoryId') categoryId: string,
  ): Promise<WebResponse<any>> {
    await this.categoryService.delete(categoryId);

    return {
      meta: {
        code: HttpStatus.OK,
        message: 'delete category successfully',
        status: 'success',
      },
    };
  }
}
