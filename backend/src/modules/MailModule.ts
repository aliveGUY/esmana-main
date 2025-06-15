import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { MailService } from 'src/services/MailService';
import { CertificateModule } from './CertificateModule';

@Module({
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('mailer.host'),
          port: configService.get<number>('mailer.port'),
          secure: false,
          auth: {
            user: configService.get<string>('mailer.user'),
            pass: configService.get<string>('mailer.pass'),
          },
        },
        defaults: {
          from: '"Esmana" <info@esmana-main.org>',
        },
        template: {
          dir: join(__dirname, '..', '..', 'public', 'templates'),
          adapter: new EjsAdapter(),
          options: {
            strict: false,
          },
        },
      }),
      inject: [ConfigService],
    }),
    CertificateModule,
  ],
  providers: [
    {
      provide: 'IMailService',
      useClass: MailService,
    },
  ],
  exports: ['IMailService'],
})
export class MailModule {}
