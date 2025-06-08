import { Module } from '@nestjs/common';
import { CertificateService } from '../services/CertificateService';
import { AuthModule } from './AuthModule';

@Module({
  imports: [AuthModule],
  providers: [
    {
      provide: 'ICertificateService',
      useClass: CertificateService,
    },
  ],
  exports: ['ICertificateService'],
})
export class CertificateModule { }
