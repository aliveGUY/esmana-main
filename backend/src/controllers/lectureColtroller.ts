import { Body, Controller, Get, Headers, HttpCode, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleMeetClient } from 'src/clients/GoogleMeetClient';
import { YouTubeClient } from 'src/clients/YouTubeClient';
import { AuthenticatedGuard } from 'src/guards/AuthenticatedGuard';
import { CreateLectureDto } from 'src/models/dto/CreateLectureDto';
import { LectureService } from 'src/services/lectureService';
import { Response } from 'express';
import { StripeClient } from 'src/clients/StripeClient';
import { Course } from 'src/models/Course';
import Stripe from 'stripe';

@Controller('/')
export class LectureController {
  constructor(
    private readonly lectureService: LectureService,
    private readonly youtubeClient: YouTubeClient,
    private readonly googleMeetClient: GoogleMeetClient,
    private readonly stripeClient: StripeClient) { }

  @Post()
  @UseGuards(AuthenticatedGuard)
  async createLecture(@Body() lecture: CreateLectureDto): Promise<Course> {
    return await this.lectureService.createLecture(lecture)
  }

  @Get('search')
  async search(@Query('q') query: string) {
    return this.youtubeClient.searchVideos(query)
  }

  @Get('google')
  async createCall(@Res() res: Response) {
    const url = this.googleMeetClient.learning();
    res.redirect(url);
  }

  @Post('create-payment-intent')
  async createCheckoutSession(@Body() data) {
    return this.stripeClient.createCheckoutSession(data)
  }

  @Post('payment-intent-webhook')
  @HttpCode(200)
  async handleWebhook(
    @Req() req: Request & { rawBody: Buffer },
    @Res() res: Response,
    @Headers('stripe-signature') signature: string,
  ) {
    return this.stripeClient.handleWebHook({ req, res, signature })
  }
  @Get('session-status')
  async getSessionStatus(@Query('sid') sessionId: string) {
    return this.stripeClient.getSessionStatus(sessionId)
  }
}