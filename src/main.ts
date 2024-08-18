import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors({
    credentials: true,
    origin: [
      'https://social-marcy-taurus-labs-75cc6fb3.koyeb.app',
      'http://localhost:3000',
    ],
  });
  app.enableShutdownHooks();
  await app.listen(8080);
}
bootstrap();
