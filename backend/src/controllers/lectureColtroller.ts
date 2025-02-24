import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/guards/AuthenticatedGuard';
import { CreateLectureDto } from 'src/models/dto/CreateLectureDto';
import { Lecture } from 'src/models/Lecture';
import { LectureService } from 'src/services/lectureService';

@Controller('/lecture')
export class LectureController {
  constructor(private readonly lectureService: LectureService) { }

  @Post()
  @UseGuards(AuthenticatedGuard)
  async createLecture(@Body() lecture: CreateLectureDto): Promise<Lecture> {
    return await this.lectureService.createLecture(lecture)
  }
}