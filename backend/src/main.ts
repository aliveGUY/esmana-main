import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './modules/AppModule';

const DEVELOP_ORIGINS = ['http://localhost:3000', 'http://localhost:4834']
const PRODUCTION_ORIGINS = ['https://esmana-main.org', 'https://portal.esmana-main.org', 'https://school.esmana-main.org']

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.set('trust proxy', 1);

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  app.enableCors({
    origin: process.env.NODE_ENV === 'production' ? PRODUCTION_ORIGINS : DEVELOP_ORIGINS,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'sec-ch-ua-platform',
      'Referer',
      'User-Agent',
      'sec-ch-ua',
      'DNT',
      'sec-ch-ua-mobile'
    ],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 8080);
}

bootstrap();
