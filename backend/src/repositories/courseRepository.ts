import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Course } from "src/models/Course";
import { CreateCourseDto } from "src/models/dto/CreateCourseDto";
import { RemoveStudentFromCourseDto } from "src/models/dto/RemoveStudentFromCourseDto";
import { SetCourseStatusDto } from "src/models/dto/SetCourseStatusDto";
import { Repository } from "typeorm";

@Injectable()
export class CourseRepository {
  constructor(
    @InjectRepository(Course) private readonly course: Repository<Course>,
  ) { }

  async createCourse(course: CreateCourseDto): Promise<Course> {
    return await this.course.save(course)
  }

  async getAllCourses(): Promise<Course[]> {
    return this.course.find({
      relations: ['lectures', 'lectures.speakers', 'students'],
      order: { lectures: { startTime: "ASC" } }
    })
  }

  async getAllActiveCourses(): Promise<Course[]> {
    return this.course.find({
      where: { active: true },
      relations: ['lectures', 'lectures.speakers', 'students'],
      order: { lectures: { startTime: "ASC" } }
    })
  }

  async setCourseStatus(course: SetCourseStatusDto): Promise<Course> {
    await this.course.update(course.id, { active: course.active })
    return this.course.findOneOrFail({ where: { id: course.id } });
  }

  async deleteCourse(courseId: number): Promise<number> {
    await this.course.delete(courseId)
    return courseId
  }

  async removeStudentFromCourse(courseStudent: RemoveStudentFromCourseDto): Promise<Course> {
    await this.course
      .createQueryBuilder()
      .relation(Course, "students")
      .of(courseStudent.courseId)
      .remove(courseStudent.studentId);

    return await this.course.findOneOrFail({
      where: { id: courseStudent.courseId },
      relations: ['students'],
    })
  }

  async addStudentsToCourse(courseId: number, studentIds: number[]): Promise<Course> {
    await this.course
      .createQueryBuilder()
      .relation(Course, "students")
      .of(courseId)
      .add(studentIds);

    return await this.course.findOneOrFail({
      where: { id: courseId },
      relations: ['students'],
    })
  }

  async getCoursesByStudentId(studentId: number): Promise<Course[]> {
    return this.course.find({
      where: { students: { id: studentId } },
      relations: ['lectures', 'lectures.speakers', 'students'],
    });
  }

  async updateCourseDates(courseId: number, beginningDate: Date, finishDate: Date): Promise<Course> {
    await this.course.update(courseId, { beginningDate, finishDate })
    return this.course.findOneOrFail({
      where: { id: courseId },
      relations: ['lectures', 'lectures.speakers', 'students'],
    });
  }
}