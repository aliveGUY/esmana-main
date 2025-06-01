import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Course } from "src/models/Course";
import { EvaluationQuestion } from "src/models/EvaluationQuestion";
import { Lecture } from "src/models/Lecture";
import { LectureMaterials } from "src/models/LectureMaterials";
import { CourseRepository } from "src/repositories/CourseRepository";
import { EvaluationQuestionRepository } from "src/repositories/EvaluationQuestionRepository";
import { LectureMaterialsRepository } from "src/repositories/LectureMaterialsRepository";
import { LectureRepository } from "src/repositories/LectureRepository";
import { CourseService } from "src/services/CourseService";
import { LectureService } from "src/services/LectureService";
import { AuthModule } from "./AuthModule";
import { CoursesController } from "src/controllers/CoursesController";

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, EvaluationQuestion, Lecture, LectureMaterials]),
    AuthModule
  ],
  controllers: [CoursesController],
  providers: [
    {
      provide: 'ICourseRepository',
      useClass: CourseRepository
    },
    {
      provide: 'IEvaluationQuestionRepository',
      useClass: EvaluationQuestionRepository
    },
    {
      provide: 'ILectureRepository',
      useClass: LectureRepository
    },
    {
      provide: 'ILectureMaterialsRepository',
      useClass: LectureMaterialsRepository
    },
    {
      provide: 'ICourseService',
      useClass: CourseService
    },
    {
      provide: 'ILectureService',
      useClass: LectureService
    }
  ],
  exports: ['ICourseService'],
})
export class CourseModule { }
