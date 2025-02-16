import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/appModule';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000', 'https://esmana-main.org'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
    optionsSuccessStatus: 204,
  });

  await app.listen(8080, '0.0.0.0');
}
bootstrap();
