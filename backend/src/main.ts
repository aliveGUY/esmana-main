import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/appModule';
import * as session from 'express-session';
import * as passport from 'passport'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (!process.env.SESSION_SECRET) throw new Error()

  app.use(session({
    name: 'sh',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'lax',
    }
  }));

  app.enableCors({
    origin: ['http://localhost:3000', 'https://esmana-main.org'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
    optionsSuccessStatus: 204,
  });

  app.use(passport.initialize())
  app.use(passport.session())

  await app.listen(8080, '0.0.0.0');
}
bootstrap();
