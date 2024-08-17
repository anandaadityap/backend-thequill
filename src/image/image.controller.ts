import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('api/v1/image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('images'))
  uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    return this.imageService.uploadImages(files);
  }

  @Post('upload-article')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImageArticle(@UploadedFile() file: Express.Multer.File) {
    return await this.imageService.uploadImageArticle(file);
  }

  @Post('upload-banner')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImageBanner(@UploadedFile() file: Express.Multer.File) {
    return await this.imageService.uploadImageBanner(file);
  }
}
