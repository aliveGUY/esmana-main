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
  getCourseById(id: number, request: Request): Promise<DetailedCourseDto>
  getAllCourses(request: Request): Promise<StrippedCourseDto[]>
  getAllActiveCourses(): Promise<StrippedCourseDto[]>
  editCourse(course: EditCourseDto): Promise<DetailedCourseDto>
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

    const bprEvaluation = await Promise.all(
      courseDto.bprEvaluation.map(evaluation =>
        this.evaluationQuestionRepository.createEvaluationQuestion(evaluation)
      )
    );

    const lectures = await Promise.all(
      courseDto.lectures.map(lecture =>
        this.lectureService.createLecture(lecture)
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

    return await this.courseRepository.createCourse(course);
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

  async editCourse(course: EditCourseDto): Promise<DetailedCourseDto> {
    return await this.courseRepository.editCourse(course)
  }

  async deleteCourse(id: number): Promise<void> {
    return await this.courseRepository.deleteCourse(id)
  }
}
