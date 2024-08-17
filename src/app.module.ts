import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ContentModule } from './content/content.module';
import { CategoryModule } from './category/category.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UserModule, ContentModule, CategoryModule, ImageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
