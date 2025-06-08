import { Inject, Injectable } from '@nestjs/common';
import * as ejs from 'ejs';
import { IGoogleClient } from 'src/infrastructure/GoogleClient';
import { ECertificateTemplate, CERTIFICATE_FILE_ID_MAP } from 'src/models/enums/ECertificateTemplate';
import { map } from 'lodash'

export interface ICertificateService {
  getCertificateHtml();
}

@Injectable()
export class CertificateService implements ICertificateService {
  constructor(
    @Inject('IGoogleClient') private readonly googleClient: IGoogleClient,
  ) { }

  async getCertificateHtml() {
    const promises = map(CERTIFICATE_FILE_ID_MAP, async (value: string, template: ECertificateTemplate) =>
      this.getCertificateByFileId(value, template))

    return await Promise.all(promises)
  }

  private async getCertificateByFileId(value: string, template: ECertificateTemplate) {
    const data = {
      name: '[Student Name]',
      bprIndex: '0000-0000-0000000-000000',
      participationIndex: '2025/000',
      date: this.formatDate(new Date()),
    };

    const ejsString = await this.googleClient.getFileContentById(value)
    const html = ejs.render(ejsString, data)
    return { template, html }
  }

  private formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }
}
