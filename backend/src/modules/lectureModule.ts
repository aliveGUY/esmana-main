import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleMeetClient } from 'src/clients/GoogleMeetClient';
import { YouTubeClient } from 'src/clients/YouTubeClient';
import { LectureController } from 'src/controllers/lectureColtroller';
import { Lecture } from 'src/models/Lecture';
import { LectureRepository } from 'src/repositories/lectureRepository';
import { LectureService } from 'src/services/lectureService';
import { CourseModule } from './courseModule';

@Module({
  imports: [TypeOrmModule.forFeature([Lecture]), CourseModule],
  controllers: [LectureController],
  providers: [LectureRepository, LectureService, YouTubeClient, GoogleMeetClient],
  exports: [LectureService, LectureRepository],
})
export class LectureModule { }