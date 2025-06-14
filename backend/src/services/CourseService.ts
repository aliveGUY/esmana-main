import { Inject, Injectable } from "@nestjs/common";
import { CreateCourseDto } from "src/models/dto/CreateCourseDto";
import { DetailedCourseDto } from "src/models/dto/DetailedCourseDto";
import { EditCourseDto } from "src/models/dto/EditCourseDto";
import { StrippedCourseDto } from "src/models/dto/StrippedCourseDto";
import { ERoles } from "src/models/enums/ERoles";
import { ICourseRepository } from "src/repositories/CourseRepository";
import { Request, Express } from 'express';
import { Course } from "src/models/Course";
import { ILectureService } from "./LectureService";
import { IGoogleClient } from "src/infrastructure/GoogleClient";
import { has } from 'lodash'
import { Lecture } from "src/models/Lecture";
import { EditLectureDto } from "src/models/dto/EditLectureDto";
import { UserLecture } from "src/models/UserLecture";
import { AccessTokenData } from "src/models/Token";
import { IEvaluationQuestionService } from "./EvaluationQuestionService";

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
    @Inject('IEvaluationQuestionService') private readonly evaluationQuestionService: IEvaluationQuestionService,
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
    const bprEvaluationPromise = this.evaluationQuestionService.saveEvaluationQuestionsForCourse(newCourse, courseDto.bprEvaluation)

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

    await Promise.all([bprEvaluationPromise, ...lecturePromises])

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

    const bprEvaluationPromise = this.evaluationQuestionService.saveEvaluationQuestionsForCourse(updatedCourse, courseDto.bprEvaluation, existingCourse.bprEvaluation)

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
        return this.lectureService.editLecture(lecture as EditLectureDto)
      }

      return this.lectureService.createLecture(lecture)
    })

    await Promise.all([bprEvaluationPromise, ...lecturePromises])

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
