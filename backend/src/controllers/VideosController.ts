import { Controller, UseGuards, Get, Query, Inject } from '@nestjs/common';
import { TokenAuthGuard } from '../guards/TokenAuthGuard';
import { IGoogleClient } from 'src/infrastructure/GoogleClient';

@Controller('videos')
export class VideosController {
  constructor(
    @Inject('IGoogleClient') private readonly googleClient: IGoogleClient,
  ) { }

  @UseGuards(TokenAuthGuard)
  @Get('')
  async searchYoutubeVideos(@Query('title') title: string) {
    return this.googleClient.searchUploadedVideos(title)
  }
}
