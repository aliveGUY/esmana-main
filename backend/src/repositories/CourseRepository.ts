import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Course } from "src/models/Course";
import { DetailedCourseDto } from "src/models/dto/DetailedCourseDto";
import { EditCourseDto } from "src/models/dto/EditCourseDto";
import { StrippedCourseDto } from "src/models/dto/StrippedCourseDto";
import { LectureMaterials } from "src/models/LectureMaterials";
import { Repository } from "typeorm";

export interface ICourseRepository {
  createCourse(course: Partial<Course>): Promise<Course>
  getOwnedCourseById(courseId: number, userId: number): Promise<DetailedCourseDto>
  getStrippedCourseById(courseId: number): Promise<DetailedCourseDto | null>
  getFullCourseById(courseId: number): Promise<Course>
  getAllCourses(userId: number): Promise<StrippedCourseDto[]>
  getAllActiveCourses(): Promise<StrippedCourseDto[]>
  editCourse(course: Partial<Course>): Promise<Course>
  deleteCourse(id: number): Promise<void>
}

@Injectable()
export class CourseRepository implements ICourseRepository {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) { }

  async createCourse(course: Partial<Course>): Promise<Course> {
    return await this.courseRepository.save(course);
  }

  async getStrippedCourseById(courseId: number): Promise<DetailedCourseDto | null> {
    const course = await this.courseRepository
      .createQueryBuilder('course')
      .select([
        'course.id',
        'course.thumbnailUrl',
        'course.title',
        'course.description',
        'course.isActive'
      ])
      .leftJoinAndSelect('course.lectures', 'lecture')
      .leftJoinAndSelect('lecture.users', 'userLecture', 'userLecture.isLector = true')
      .leftJoin('userLecture.user', 'user')
      .leftJoinAndSelect('user.lectorDetails', 'lectorDetails')
      .addSelect([
        'user.id',
        'user.firstName',
        'user.middleName',
        'user.lastName',
        'user.profilePicture',
        'lectorDetails.id',
        'lectorDetails.credentials',
        'lectorDetails.biography'
      ])
      .where('course.id = :courseId AND course.isActive = :isActive', { courseId, isActive: true })
      .getOne();

    return course
  }

  async getOwnedCourseById(courseId: number, userId: number): Promise<DetailedCourseDto> {
    const course = await this.courseRepository
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.lectures', 'lecture')
      .leftJoinAndSelect(
        'lecture.users',
        'userLecture',
        'userLecture.userId = :userId OR userLecture.isLector = true',
        { userId }
      )
      .leftJoin('userLecture.user', 'user')
      .leftJoinAndSelect('user.lectorDetails', 'lectorDetails')
      .leftJoinAndSelect(
        'lecture.materials',
        'materials',
        `EXISTS (
          SELECT 1
          FROM user_lecture ul
          WHERE ul.lecture_id = lecture.id
            AND ul.user_id = :userId
        )`,
        { userId }
      )
      .leftJoinAndSelect('materials.evaluation', 'lectureEvaluation')
      .where('course.id = :courseId', { courseId })
      .getOne();

    if (!course) {
      throw new Error('Course not found or user does not have access');
    }

    return course as DetailedCourseDto;
  }

  async getFullCourseById(courseId: number): Promise<Course> {
    const course = await this.courseRepository
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.lectures', 'lecture')
      .leftJoinAndSelect('lecture.users', 'userLecture')
      .leftJoin('userLecture.user', 'user')
      .leftJoinAndSelect('user.lectorDetails', 'lectorDetails')
      .addSelect([
        'user.id',
        'user.firstName',
        'user.middleName',
        'user.lastName',
        'user.profilePicture',
        'lectorDetails.id',
        'lectorDetails.credentials',
        'lectorDetails.biography'
      ])
      .leftJoinAndSelect('lecture.materials', 'materials')
      .leftJoinAndSelect('materials.evaluation', 'lectureEvaluation')
      .leftJoinAndSelect('course.bprEvaluation', 'bprEvaluation')
      .where('course.id = :courseId', { courseId })
      .getOne();

    if (!course) {
      throw new Error('Course not found');
    }

    return course;
  }

  async getAllCourses(userId: number): Promise<StrippedCourseDto[]> {
    return await this.courseRepository
      .createQueryBuilder('course')
      .select([
        'course.id',
        'course.thumbnailUrl',
        'course.title',
        'course.description',
        'course.isActive'
      ])
      .leftJoinAndSelect('course.lectures', 'lecture')
      .leftJoinAndSelect('lecture.users', 'userLecture', 'userLecture.userId = :userId OR userLecture.isLector = true', { userId })
      .leftJoin('userLecture.user', 'user')
      .leftJoinAndSelect('user.lectorDetails', 'lectorDetails')
      .addSelect([
        'user.id',
        'user.firstName',
        'user.middleName',
        'user.lastName',
        'user.profilePicture',
        'lectorDetails.id',
        'lectorDetails.credentials',
        'lectorDetails.biography'
      ])
      .getMany();
  }

  async getAllActiveCourses(): Promise<StrippedCourseDto[]> {
    return await this.courseRepository
      .createQueryBuilder('course')
      .select([
        'course.id',
        'course.thumbnailUrl',
        'course.title',
        'course.description',
      ])
      .leftJoinAndSelect('course.lectures', 'lecture')
      .leftJoinAndSelect('lecture.users', 'userLecture', 'userLecture.isLector = true')
      .leftJoin('userLecture.user', 'user')
      .leftJoinAndSelect('user.lectorDetails', 'lectorDetails')
      .addSelect([
        'user.id',
        'user.firstName',
        'user.middleName',
        'user.lastName',
        'user.profilePicture',
        'lectorDetails.id',
        'lectorDetails.credentials',
        'lectorDetails.biography'
      ])
      .where('course.isActive = :isActive', { isActive: true })
      .getMany();
  }

  async editCourse(course: Partial<Course>): Promise<Course> {
    return await this.courseRepository.save(course);
  }

  async deleteCourse(id: number): Promise<void> {
    await this.courseRepository.delete(id);
  }
}
