import { Controller, UseGuards, Get, Inject, Param, Res, Query } from '@nestjs/common';
import { TokenAuthGuard } from '../guards/TokenAuthGuard';
import { IGoogleClient } from 'src/infrastructure/GoogleClient';
import { Response } from 'express';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('static')
export class StaticFilesController {
  constructor(
    @Inject('IGoogleClient') private readonly googleClient: IGoogleClient,
  ) { }

  @Public()
  @Get('images/:fileId')
  async getStaticFile(@Param('fileId') fileId: string, @Res() res: Response) {
    const { stream, mimeType } = await this.googleClient.getFileStreamById(fileId)
    res.setHeader('Content-Type', mimeType);
    stream.pipe(res);
  }

  @UseGuards(TokenAuthGuard)
  @Get('video')
  async searchYoutubeVideos(@Query('title') title: string) {
    return this.googleClient.searchUploadedVideos(title)
  }
}
