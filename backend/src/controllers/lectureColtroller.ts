import { Body, Controller, Get, Post, Query, Res, UseGuards } from '@nestjs/common';
import { GoogleMeetClient } from 'src/clients/GoogleMeetClient';
import { YouTubeClient } from 'src/clients/YouTubeClient';
import { AuthenticatedGuard } from 'src/guards/AuthenticatedGuard';
import { CreateLectureDto } from 'src/models/dto/CreateLectureDto';
import { LectureService } from 'src/services/lectureService';
import { Response } from 'express';
import { Course } from 'src/models/Course';

@Controller('/lecture')
export class LectureController {
  constructor(
    private readonly lectureService: LectureService,
    private readonly youtubeClient: YouTubeClient,
    private readonly googleMeetClient: GoogleMeetClient) { }

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
}