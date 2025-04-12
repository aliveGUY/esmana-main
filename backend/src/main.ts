import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/appModule';
import * as session from 'express-session';
import * as passport from 'passport'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });
  const isDevelop = process.env.NODE_ENV === 'development'
  const clientOrigin = isDevelop ? 'http://localhost:3000' : ['https://www.esmana-main.org', 'https://esmana-main.org']

  if (!process.env.SESSION_SECRET) throw new Error()
  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.set('trust proxy', 1);

  app.use(session({
    name: 'sh',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
      httpOnly: true,
      secure: !isDevelop,
    }
  }));

  app.enableCors({
    origin: clientOrigin,
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
