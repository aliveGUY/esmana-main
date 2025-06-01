import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Course } from "src/models/Course";
import { DetailedCourseDto } from "src/models/dto/DetailedCourseDto";
import { EditCourseDto } from "src/models/dto/EditCourseDto";
import { StrippedCourseDto } from "src/models/dto/StrippedCourseDto";
import { Repository } from "typeorm";

export interface ICourseRepository {
  createCourse(course: Partial<Course>): Promise<DetailedCourseDto>
  getOwnedCourseById(courseId: number, userId: number): Promise<DetailedCourseDto>
  getFullCourseById(courseId: number): Promise<DetailedCourseDto>
  getAllCourses(): Promise<StrippedCourseDto[]>
  getAllActiveCourses(): Promise<StrippedCourseDto[]>
  editCourse(course: EditCourseDto): Promise<DetailedCourseDto>
  deleteCourse(id: number): Promise<void>
}

@Injectable()
export class CourseRepository implements ICourseRepository {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) { }

  async createCourse(course: Partial<Course>): Promise<DetailedCourseDto> {
    const savedCourse = await this.courseRepository.save(course);
    return await this.courseRepository.findOne({
      where: { id: savedCourse.id },
      relations: ['lectures', 'bprEvaluation']
    }) as DetailedCourseDto;
  }

  async getOwnedCourseById(courseId: number, userId: number): Promise<DetailedCourseDto> {
    console.log("getOwnedCourseById")
    const course = await this.courseRepository
      .createQueryBuilder('course')
      .select([
        'course.id',
        'course.thumbnailUrl',
        'course.title',
        'course.description',
        'course.isActive',
        'course.createdAt',
        'course.updatedAt'
      ])
      .leftJoinAndSelect('course.lectures', 'lecture')
      .leftJoinAndSelect('lecture.users', 'userLecture', 'userLecture.userId = :userId OR userLecture.isLector = true', { userId })
      .leftJoinAndSelect('userLecture.user', 'user')
      .leftJoinAndSelect('lecture.materials', 'materials',
        'EXISTS (SELECT 1 FROM user_lecture ul WHERE ul.lecture_id = lecture.id AND (ul.user_id = :userId OR ul.is_lector = true))')
      .leftJoinAndSelect('materials.evaluation', 'lectureEvaluation')
      .where('course.id = :courseId', { courseId })
      .getOne();

    if (!course) {
      throw new Error('Course not found or user does not have access');
    }

    return course as DetailedCourseDto;
  }

  async getFullCourseById(courseId: number): Promise<DetailedCourseDto> {
    const course = await this.courseRepository
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.lectures', 'lecture')
      .leftJoinAndSelect('lecture.users', 'userLecture')
      .leftJoinAndSelect('userLecture.user', 'user')
      .leftJoinAndSelect('lecture.materials', 'materials')
      .leftJoinAndSelect('materials.evaluation', 'lectureEvaluation')
      .leftJoinAndSelect('course.bprEvaluation', 'bprEvaluation')
      .where('course.id = :courseId', { courseId })
      .getOne();

    if (!course) {
      throw new Error('Course not found');
    }

    return course as DetailedCourseDto;
  }

  async getAllCourses(): Promise<StrippedCourseDto[]> {
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
      .leftJoinAndSelect('lecture.users', 'userLecture', 'userLecture.isLector = true')
      .leftJoinAndSelect('userLecture.user', 'user')
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
      .leftJoinAndSelect('userLecture.user', 'user')
      .where('course.isActive = :isActive', { isActive: true })  // ← Add this filter
      .getMany();
  }

  async editCourse(course: EditCourseDto): Promise<DetailedCourseDto> {
    await this.courseRepository.update(course.id, course);
    return await this.courseRepository.findOne({
      where: { id: course.id },
      relations: ['lectures', 'bprEvaluation']
    }) as DetailedCourseDto;
  }

  async deleteCourse(id: number): Promise<void> {
    await this.courseRepository.delete(id);
  }
}
