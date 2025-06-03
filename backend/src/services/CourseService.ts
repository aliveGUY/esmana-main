import { Inject, Injectable } from "@nestjs/common";
import { CreateCourseDto } from "src/models/dto/CreateCourseDto";
import { DetailedCourseDto } from "src/models/dto/DetailedCourseDto";
import { EditCourseDto } from "src/models/dto/EditCourseDto";
import { StrippedCourseDto } from "src/models/dto/StrippedCourseDto";
import { ERoles } from "src/models/enums/ERoles";
import { ICourseRepository } from "src/repositories/CourseRepository";
import { ITokenRepository } from "src/repositories/TokenRepository";
import { Request } from 'express';
import { IEvaluationQuestionRepository } from "src/repositories/EvaluationQuestionRepository";
import { Course } from "src/models/Course";
import { ILectureService } from "./LectureService";
import { IGoogleClient } from "src/infrastructure/GoogleClient";

export interface ICourseService {
  createCourse(course: CreateCourseDto, thumbnail?: Express.Multer.File): Promise<DetailedCourseDto>
  editCourse(course: EditCourseDto, thumbnail?: Express.Multer.File): Promise<DetailedCourseDto>
  getCourseById(id: number, request: Request): Promise<DetailedCourseDto>
  getAllCourses(request: Request): Promise<StrippedCourseDto[]>
  getAllActiveCourses(): Promise<StrippedCourseDto[]>
  deleteCourse(id: number): Promise<void>
}

@Injectable()
export class CourseService implements ICourseService {
  constructor(
    @Inject('ICourseRepository') private readonly courseRepository: ICourseRepository,
    @Inject('ITokenRepository') private readonly tokenRepository: ITokenRepository,
    @Inject('IEvaluationQuestionRepository') private readonly evaluationQuestionRepository: IEvaluationQuestionRepository,
    @Inject('ILectureService') private readonly lectureService: ILectureService,
    @Inject('IGoogleClient') private readonly googleClient: IGoogleClient,
  ) { }

  async createCourse(courseDto: CreateCourseDto, thumbnail?: Express.Multer.File): Promise<DetailedCourseDto> {
    let thumbnailUrl = ""
    if (thumbnail) {
      thumbnailUrl = await this.googleClient.uploadMulterFileToDrive(thumbnail)
    }


    const lectures = await Promise.all(
      courseDto.lectures.map(lecture =>
        this.lectureService.createLecture(lecture)
      )
    );

    const bprEvaluation = await Promise.all(
      courseDto.bprEvaluation.map(evaluation =>
        this.evaluationQuestionRepository.createEvaluationQuestion(evaluation)
      )
    );

    const course: Partial<Course> = {
      thumbnailUrl: thumbnailUrl,
      title: courseDto.title,
      description: courseDto.description,
      isActive: courseDto.isActive,
      participationCertificate: courseDto.participationCertificate,
      bprCertificate: courseDto.bprCertificate,
      lectures: lectures,
      bprEvaluation: bprEvaluation,
    };

    const newCourse = await this.courseRepository.createCourse(course);

    return await this.courseRepository.getFullCourseById(newCourse.id)
  }

  async editCourse(courseDto: EditCourseDto, thumbnail?: Express.Multer.File): Promise<DetailedCourseDto> {
    const existingCourse = await this.courseRepository.getFullCourseById(courseDto.id);

    if (thumbnail) {
      await this.googleClient.deleteFileIfExists(existingCourse.thumbnailUrl);
      courseDto.thumbnailUrl = await this.googleClient.uploadMulterFileToDrive(thumbnail);
    }

    if (courseDto.lectures?.length > 0) {
      const processedLectures = await Promise.all(
        courseDto.lectures.map(async (lecture: any) => {
          if (lecture.id) return await this.lectureService.editLecture(lecture);
          const newLecture = await this.lectureService.createLecture(lecture);
          newLecture.course = existingCourse;
          return newLecture;
        })
      );

      const lectureMap = new Map(processedLectures.map(l => [l.id, l]));
      const mergedLectures = existingCourse.lectures.map(existing => lectureMap.get(existing.id) || existing);
      const newLectures = processedLectures.filter(l => !existingCourse.lectures.some(e => e.id === l.id));

      existingCourse.lectures = [...mergedLectures, ...newLectures];
    }

    if (courseDto.bprEvaluation?.length > 0) {
      const processedEvaluations = await Promise.all(
        courseDto.bprEvaluation.map(async (evaluation: any) => {
          if (evaluation.id) return await this.evaluationQuestionRepository.editEvaluationQuestion(evaluation);
          return await this.evaluationQuestionRepository.createEvaluationQuestion(evaluation);
        })
      );
      existingCourse.bprEvaluation = processedEvaluations;
    }

    Object.assign(existingCourse, courseDto);
    return await this.courseRepository.editCourse(existingCourse);
  }

  async getCourseById(id: number, request: Request): Promise<DetailedCourseDto> {
    const tokenData = await this.tokenRepository.validateToken(request.cookies?.access_token)

    if (!tokenData) throw new Error('Unauthorized')

    if (tokenData.roles.includes(ERoles.ADMIN)) {
      return await this.courseRepository.getFullCourseById(id)
    }

    return await this.courseRepository.getOwnedCourseById(id, tokenData.userId)
  }

  async getAllCourses(request: Request): Promise<StrippedCourseDto[]> {
    const tokenData = await this.tokenRepository.validateToken(request.cookies?.access_token)

    if (!tokenData) throw new Error('Unauthorized')

    return await this.courseRepository.getAllCourses(tokenData.userId)
  }

  async getAllActiveCourses(): Promise<StrippedCourseDto[]> {
    return await this.courseRepository.getAllActiveCourses()
  }



  async deleteCourse(id: number): Promise<void> {
    return await this.courseRepository.deleteCourse(id)
  }
}
