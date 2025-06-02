import { Controller, UseGuards, Get, Inject, Param, Res } from '@nestjs/common';
import { TokenAuthGuard } from '../guards/TokenAuthGuard';
import { IGoogleClient } from 'src/infrastructure/GoogleClient';
import { Response } from 'express';

@Controller('static/images')
export class StaticFilesController {
  constructor(
    @Inject('IGoogleClient') private readonly googleClient: IGoogleClient,
  ) { }

  @UseGuards(TokenAuthGuard)
  @Get(':fileId')
  async getStaticFile(@Param('fileId') fileId: string, @Res() res: Response) {
    const { stream, mimeType } = await this.googleClient.getFileStreamById(fileId)
    res.setHeader('Content-Type', mimeType);
    stream.pipe(res);
  }
}
