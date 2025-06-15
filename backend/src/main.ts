import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import { AppModule } from './modules/AppModule';

const DEVELOP_ORIGINS = ['http://localhost:3000', 'http://localhost:4834']
const PRODUCTION_ORIGINS = ['https://esmana-main.org', 'https://portal.esmana-main.org', 'https://school.esmana-main.org']

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Serve static files from public folder
  app.useStaticAssets(join(__dirname, '..', 'public'));
  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.set('trust proxy', 1);

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  app.enableCors({
    origin: process.env.NODE_ENV === 'development' ? DEVELOP_ORIGINS : PRODUCTION_ORIGINS,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 8080);
}

bootstrap();
