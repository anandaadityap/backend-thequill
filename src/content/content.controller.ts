import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ContentService } from './content.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestContentDto, ResponseContentDto } from 'src/dto/content.dto';
import { WebResponse } from 'src/dto/web.dto';
import { ImageService } from 'src/image/image.service';

@Controller('api/v1/content')
export class ContentController {
  constructor(
    private readonly contentService: ContentService,
    private imageService: ImageService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createContent(
    @Body() body: RequestContentDto,
    @Req() req,
  ): Promise<WebResponse<ResponseContentDto>> {
    const content = await this.contentService.create(req.user.id, body);

    return {
      meta: {
        code: HttpStatus.CREATED,
        message: 'create content successfully',
        status: 'success',
      },
      data: content,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllContent(
    @Query('search') search?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    const contents = await this.contentService.findAll({ search, page, limit });

    return {
      meta: {
        code: HttpStatus.OK,
        message: 'Get all content successfully',
        status: 'success',
      },
      data: contents,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-content')
  @HttpCode(HttpStatus.OK)
  async getAllContentByUser(
    @Req() req,
    @Query('search') search?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    const userId = req.user.id;
    const contents = await this.contentService.findAllByUser({
      userId,
      search,
      page,
      limit,
    });

    return {
      meta: {
        code: HttpStatus.OK,
        message: 'Get all content successfully',
        status: 'success',
      },
      data: contents,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:contentId')
  @HttpCode(HttpStatus.OK)
  async getContentById(
    @Param('contentId') contentId: string,
  ): Promise<WebResponse<ResponseContentDto>> {
    const content = await this.contentService.findById(contentId);

    return {
      meta: {
        code: HttpStatus.OK,
        message: 'Get content by id successfully',
        status: 'success',
      },
      data: content,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:contentId')
  @HttpCode(HttpStatus.OK)
  async UpdateContent(
    @Req() req,
    @Param('contentId') contentId: string,
    @Body() Body: RequestContentDto,
  ): Promise<WebResponse<ResponseContentDto>> {
    const content = await this.contentService.update(
      req.user.id,
      contentId,
      Body,
    );

    return {
      meta: {
        code: HttpStatus.OK,
        message: 'Get content by id successfully',
        status: 'success',
      },
      data: content,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':contentId')
  @HttpCode(HttpStatus.OK)
  async DeleteContent(
    @Req() req,
    @Param('contentId') contentId: string,
  ): Promise<WebResponse<any>> {
    await this.contentService.delete(req.user.id, contentId);

    return {
      meta: {
        code: HttpStatus.OK,
        message: 'Delete content successfully',
        status: 'success',
      },
    };
  }
}
