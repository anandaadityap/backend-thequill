import { Injectable } from '@nestjs/common';
import { RequestCategoryDto, ResponseCategoryDto } from 'src/dto/category.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}

  async create(
    requestCategory: RequestCategoryDto,
  ): Promise<ResponseCategoryDto> {
    return await this.prismaService.category.create({
      data: { ...requestCategory },
    });
  }

  async update(
    categoryId: string,
    requestCategory: RequestCategoryDto,
  ): Promise<ResponseCategoryDto> {
    return await this.prismaService.category.update({
      where: { id: categoryId },
      data: { ...requestCategory },
    });
  }

  async findAll(): Promise<ResponseCategoryDto[]> {
    return await this.prismaService.category.findMany();
  }

  async delete(categoryId: string): Promise<any> {
    return await this.prismaService.category.delete({
      where: { id: categoryId },
    });
  }
}
