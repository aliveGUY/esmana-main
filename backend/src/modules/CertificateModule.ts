import { Module } from '@nestjs/common';
import { CertificateService } from '../services/CertificateService';
import { GoogleModule } from './GoogleModule';

@Module({
  imports: [GoogleModule],
  providers: [
    {
      provide: 'ICertificateService',
      useClass: CertificateService,
    },
  ],
  exports: ['ICertificateService'],
})
export class CertificateModule { }
