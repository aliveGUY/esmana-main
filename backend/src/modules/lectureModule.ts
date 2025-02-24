import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LectureController } from 'src/controllers/lectureColtroller';
import { Lecture } from 'src/models/Lecture';
import { LectureRepository } from 'src/repositories/lectureRepository';
import { LectureService } from 'src/services/lectureService';

@Module({
  imports: [TypeOrmModule.forFeature([Lecture])],
  controllers: [LectureController],
  providers: [LectureRepository, LectureService],
  exports: [LectureService],
})
export class LectureModule { }