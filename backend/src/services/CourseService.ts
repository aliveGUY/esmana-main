import { Inject, Injectable } from "@nestjs/common";
import { CreateCourseDto } from "src/models/dto/CreateCourseDto";
import { DetailedCourseDto } from "src/models/dto/DetailedCourseDto";
import { EditCourseDto } from "src/models/dto/EditCourseDto";
import { StrippedCourseDto } from "src/models/dto/StrippedCourseDto";
import { ERoles } from "src/models/enums/ERoles";
import { ICourseRepository } from "src/repositories/CourseRepository";
import { ITokenRepository } from "src/repositories/TokenRepository";
import { Request, Express } from 'express';
import { IEvaluationQuestionRepository } from "src/repositories/EvaluationQuestionRepository";
import { Course } from "src/models/Course";
import { ILectureService } from "./LectureService";
import { IGoogleClient } from "src/infrastructure/GoogleClient";
import { EvaluationQuestion } from "src/models/EvaluationQuestion";
import { has } from 'lodash'
import { Lecture } from "src/models/Lecture";
import { EditLectureDto } from "src/models/dto/EditLectureDto";
import { UserLecture } from "src/models/UserLecture";
import { AccessTokenData } from "src/models/Token";

export interface ICourseService {
  createCourse(course: CreateCourseDto, thumbnail?: Express.Multer.File): Promise<DetailedCourseDto>
  editCourse(course: EditCourseDto, thumbnail?: Express.Multer.File): Promise<DetailedCourseDto>
  getCourseById(id: number, request: Request): Promise<DetailedCourseDto | null>
  getActiveCourseById(id: number): Promise<DetailedCourseDto | null>
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


    const courseWithoutLectures: Partial<Course> = {
      eventId: courseDto.description,
      thumbnailUrl: thumbnailUrl,
      title: courseDto.title,
      description: courseDto.description,
      isActive: courseDto.isActive,
      participationCertificate: courseDto.participationCertificate,
      bprCertificate: courseDto.bprCertificate,
    };

    const newCourse = await this.courseRepository.createCourse(courseWithoutLectures);

    const bprEvaluationPromises = courseDto.bprEvaluation.map(evaluation => {
      const question: Partial<EvaluationQuestion> = {
        questionText: evaluation.questionText,
        correctAnswers: evaluation.correctAnswers,
        options: evaluation.options,
        course: newCourse
      }

      return this.evaluationQuestionRepository.createEvaluationQuestion(question)
    })

    const lecturePromises = courseDto.lectures.map(lectureDto => {
      const lecture: Partial<Lecture> = {
        title: lectureDto.title,
        description: lectureDto.description,
        price: lectureDto.price,
        startTime: lectureDto.startTime,
        endTime: lectureDto.endTime,
        users: lectureDto.users as UserLecture[],
        course: newCourse,
      }

      return this.lectureService.createLecture(lecture)
    }
    )

    await Promise.all([bprEvaluationPromises, lecturePromises])

    return await this.courseRepository.getFullCourseById(newCourse.id)
  }

  async editCourse(courseDto: EditCourseDto, thumbnail?: Express.Multer.File): Promise<DetailedCourseDto> {
    const existingCourse = await this.courseRepository.getFullCourseById(courseDto.id);

    let thumbnailUrl = courseDto.thumbnailUrl
    if (thumbnail) {
      await this.googleClient.deleteFileIfExists(existingCourse.thumbnailUrl);
      thumbnailUrl = await this.googleClient.uploadMulterFileToDrive(thumbnail);
    }

    const courseWithoutLectures: Partial<Course> = {
      id: courseDto.id,
      eventId: courseDto.description,
      thumbnailUrl: thumbnailUrl,
      title: courseDto.title,
      description: courseDto.description,
      isActive: courseDto.isActive,
      participationCertificate: courseDto.participationCertificate,
      bprCertificate: courseDto.bprCertificate,
    };

    const updatedCourse = await this.courseRepository.editCourse(courseWithoutLectures)

    const bprEvaluationPromises = courseDto.bprEvaluation.map((evaluation) => {
      const question: Partial<EvaluationQuestion> = {
        questionText: evaluation.questionText,
        correctAnswers: evaluation.correctAnswers,
        options: evaluation.options,
        course: updatedCourse
      }

      if (has(evaluation, 'id')) {
        question.id = evaluation.id
        return this.evaluationQuestionRepository.editEvaluationQuestion(question)
      }

      return this.evaluationQuestionRepository.createEvaluationQuestion(question)
    })

    const lecturePromises = courseDto.lectures.map((lectureDto: Partial<Lecture>) => {
      const lecture: Partial<Lecture> = {
        title: lectureDto.title,
        description: lectureDto.description,
        price: lectureDto.price,
        startTime: lectureDto.startTime,
        endTime: lectureDto.endTime,
        users: lectureDto.users,
        course: updatedCourse,
        materials: lectureDto.materials
      }

      if (has(lectureDto, 'id')) {
        lecture.id = lectureDto.id
        console.log("SHOULD EDIT LECTURE", {})
        return this.lectureService.editLecture(lecture as EditLectureDto)
      }

      console.log("SHOULD CREATE LECTURE")
      return this.lectureService.createLecture(lecture)
    })

    await Promise.all([bprEvaluationPromises, lecturePromises])

    return await this.courseRepository.getFullCourseById(updatedCourse.id)
  }

  async getCourseById(id: number, request: Request): Promise<DetailedCourseDto | null> {
    const tokenData = request.user as AccessTokenData

    if (tokenData.roles.includes(ERoles.ADMIN)) {
      return await this.courseRepository.getFullCourseById(id)
    }

    return await this.courseRepository.getOwnedCourseById(id, tokenData.userId)
  }

  async getActiveCourseById(id: number): Promise<DetailedCourseDto | null> {
    return await this.courseRepository.getStrippedCourseById(id)
  }

  async getAllCourses(request: Request): Promise<StrippedCourseDto[]> {
    const tokenData = request.user as AccessTokenData | undefined

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
