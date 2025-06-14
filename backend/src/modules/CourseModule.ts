import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Course } from "src/models/Course";
import { EvaluationQuestion } from "src/models/EvaluationQuestion";
import { Lecture } from "src/models/Lecture";
import { LectureMaterials } from "src/models/LectureMaterials";
import { UserLecture } from "src/models/UserLecture";
import { CourseRepository } from "src/repositories/CourseRepository";
import { EvaluationQuestionRepository } from "src/repositories/EvaluationQuestionRepository";
import { LectureMaterialsRepository } from "src/repositories/LectureMaterialsRepository";
import { LectureRepository } from "src/repositories/LectureRepository";
import { UserLectureRepository } from "src/repositories/UserLectureRepository";
import { CourseService } from "src/services/CourseService";
import { LectureService } from "src/services/LectureService";
import { AuthModule } from "./AuthModule";
import { CoursesController } from "src/controllers/CoursesController";
import { EvaluationController } from "src/controllers/EvaluationController";
import { EvaluationService } from "src/services/EvaluationService";
import { EvaluationQuestionService } from "src/services/EvaluationQuestionService";
import { UserLectureService } from "src/services/UserLectureService";
import { MailModule } from "./MailModule";
import { GoogleModule } from "./GoogleModule";

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, EvaluationQuestion, Lecture, LectureMaterials, UserLecture]),
    AuthModule,
    MailModule,
    GoogleModule
  ],
  controllers: [CoursesController, EvaluationController],
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
      provide: 'IUserLectureRepository',
      useClass: UserLectureRepository
    },
    {
      provide: 'ICourseService',
      useClass: CourseService
    },
    {
      provide: 'ILectureService',
      useClass: LectureService
    },
    {
      provide: 'IEvaluationService',
      useClass: EvaluationService
    },
    {
      provide: 'IEvaluationQuestionService',
      useClass: EvaluationQuestionService
    },
    {
      provide: 'IUserLectureService',
      useClass: UserLectureService
    }
  ],
  exports: ['ICourseService', 'IUserLectureRepository'],
})
export class CourseModule { }
