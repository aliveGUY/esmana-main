import { MailerService } from "@nestjs-modules/mailer";
import { Inject, Injectable } from "@nestjs/common";
import { ICertificateService } from "./CertificateService";
import { ECertificateTemplate } from "src/models/enums/ECertificateTemplate";
import * as pdf from 'html-pdf';
import * as fs from 'fs';
import { promisify } from 'util';

const createPdf = promisify(pdf.create.bind(pdf));

async function generatePdfBuffer(html: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    pdf.create(html).toBuffer((err, buffer) => {
      if (err) reject(err);
      else resolve(buffer);
    });
  });
}


export interface IMailService {
  sendWelcomeEmail(to: string, name: string)
}

@Injectable()
export class MailService implements IMailService {
  constructor(
    private readonly mailerService: MailerService,
    @Inject('ICertificateService') private readonly certificateService: ICertificateService,
  ) { }

  async sendWelcomeEmail(to: string, name: string) {
    const certificate = await this.certificateService.getCertificateTemplate(ECertificateTemplate.CERTIFICATE_TEMPLATE_PARTICIPATION_08_06_2025)
    console.log('Mailer config:', {
      host: process.env.MAILER_HOST,
      port: process.env.MAILER_PORT,
    });

    const pdfBuffer = await generatePdfBuffer(certificate.html);

    await this.mailerService.sendMail({
      to: 'illia.dubrovin@dreamhost.com',
      subject: 'Welcome to the platform!',
      template: 'welcome',
      context: { name: 'Customer' },
      attachments: [
        {
          filename: 'invoice.pdf',
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    });
  }
}
