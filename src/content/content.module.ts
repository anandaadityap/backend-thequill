import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { PrismaService } from 'src/prisma.service';
import { ImageService } from 'src/image/image.service';

@Module({
  controllers: [ContentController],
  providers: [ContentService, PrismaService, ImageService],
})
export class ContentModule {}
