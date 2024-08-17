import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { RequestContentDto, ResponseContentDto } from 'src/dto/content.dto';
import { PrismaService } from 'src/prisma.service';

interface FindAllArgs {
  search?: string;
  page: number;
  limit: number;
}
interface FindAllByUserArgs {
  userId: string;
  search?: string;
  page: number;
  limit: number;
}

@Injectable()
export class ContentService {
  constructor(private prismaService: PrismaService) {}

  async create(
    userId: string,
    body: RequestContentDto,
  ): Promise<ResponseContentDto> {
    const content = await this.prismaService.content.create({
      data: {
        ...body,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return content;
  }

  async findAll({ search, page, limit }: FindAllArgs) {
    const skip = (page - 1) * limit;
    const where = search
      ? {
          OR: [
            { title: { contains: search, mode: Prisma.QueryMode.insensitive } },
            {
              article: { contains: search, mode: Prisma.QueryMode.insensitive },
            },
          ],
        }
      : {};
    const data = await this.prismaService.content.findMany({
      where,
      skip: skip,
      take: limit,
      include: {
        user: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
    const totalItems = await this.prismaService.content.count({ where });

    return {
      contents: data,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
    };
  }

  async findAllByUser({ userId, search, page, limit }: FindAllByUserArgs) {
    const skip = (page - 1) * limit;
    const where = search
      ? {
          user_id: userId,
          OR: [
            { title: { contains: search, mode: Prisma.QueryMode.insensitive } },
            {
              article: { contains: search, mode: Prisma.QueryMode.insensitive },
            },
          ],
        }
      : { user_id: userId };
    const data = await this.prismaService.content.findMany({
      where,
      skip: skip,
      take: limit,
      include: {
        user: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
    const totalItems = await this.prismaService.content.count({ where });

    return {
      contents: data,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
    };
  }

  async findById(contentId: string): Promise<ResponseContentDto> {
    return this.prismaService.content.findFirst({
      where: { id: contentId },
      include: { user: true },
    });
  }

  async update(
    userId: string,
    contentId: string,
    body: RequestContentDto,
  ): Promise<ResponseContentDto> {
    const contentExist = await this.prismaService.content.findUnique({
      where: { id: contentId },
    });

    if (!contentExist)
      throw new HttpException('content not found', HttpStatus.NOT_FOUND);

    if (contentExist.user_id !== userId)
      throw new HttpException(
        'this content is not yours',
        HttpStatus.FORBIDDEN,
      );

    return this.prismaService.content.update({
      where: { id: contentId },
      data: { ...body },
    });
  }

  async delete(userId: string, contentId: string): Promise<any> {
    const contentExist = await this.prismaService.content.findUnique({
      where: { id: contentId },
    });

    if (!contentExist)
      throw new HttpException('content not found', HttpStatus.NOT_FOUND);

    if (contentExist.user_id !== userId)
      throw new HttpException(
        'this content is not yours',
        HttpStatus.FORBIDDEN,
      );
    return this.prismaService.content.delete({
      where: { id: contentId },
    });
  }
}
