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
  getFullCourseById(courseId: number): Promise<Course>
  getAllCourses(userId: number): Promise<StrippedCourseDto[]>
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
      .leftJoin('userLecture.user', 'user')
      .addSelect([
        'user.id',
        'user.firstName',
        'user.middleName',
        'user.lastName',
        'user.profilePicture',
        'user.email',
      ])
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

  async getFullCourseById(courseId: number): Promise<Course> {
    const course = await this.courseRepository
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.lectures', 'lecture')
      .leftJoinAndSelect('lecture.users', 'userLecture')
      .leftJoin('userLecture.user', 'user')
      .addSelect([
        'user.id',
        'user.firstName',
        'user.middleName',
        'user.lastName',
        'user.profilePicture'
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
      .addSelect([
        'user.id',
        'user.firstName',
        'user.middleName',
        'user.lastName',
        'user.profilePicture',
        'user.email',
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
      .addSelect([
        'user.id',
        'user.firstName',
        'user.middleName',
        'user.lastName',
        'user.profilePicture',
        'user.email',
      ])
      .where('course.isActive = :isActive', { isActive: true })
      .getMany();
  }

  async editCourse(course: any): Promise<DetailedCourseDto> {
    await this.courseRepository.save(course);
    return await this.getFullCourseById(course.id);
  }

  async deleteCourse(id: number): Promise<void> {
    await this.courseRepository.delete(id);
  }
}
