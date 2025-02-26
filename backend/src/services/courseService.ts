import { Injectable } from "@nestjs/common";
import { Course } from "src/models/Course";
import { RemoveStudentFromCourseDto } from "src/models/dto/RemoveStudentFromCourseDto";
import { CreateCourseDto } from "src/models/dto/CreateCourseDto";
import { SetCourseStatusDto } from "src/models/dto/SetCourseStatusDto";
import { CourseRepository } from "src/repositories/courseRepository";
import { AddStudentsToCourseDto } from "src/models/dto/AddStudentsToCourseDto";
import { map } from "lodash";
import { NotificationRepository } from "src/repositories/notificationRepository";
import { ApproveCourseNotificationDto } from "src/models/dto/ApproveCourseNotificationDto";

@Injectable()
export class CourseService {
  constructor(private readonly courseRepository: CourseRepository,
    private readonly notificationRepository: NotificationRepository
  ) { }

  async createCourse(course: CreateCourseDto): Promise<Course> {
    return this.courseRepository.createCourse(course)
  }

  async getAllCourses(): Promise<Course[]> {
    return this.courseRepository.getAllCourses()
  }

  async getAllActiveCourses(): Promise<Course[]> {
    return this.courseRepository.getAllActiveCourses()
  }

  async setCourseStatus(course: SetCourseStatusDto): Promise<Course> {
    return this.courseRepository.setCourseStatus(course)
  }

  async deleteCourse(courseId: string): Promise<number> {
    return this.courseRepository.deleteCourse(Number(courseId))
  }

  async removeStudentFromCourse(courseStudent: RemoveStudentFromCourseDto): Promise<Course> {
    return this.courseRepository.removeStudentFromCourse(courseStudent)
  }

  async addStudentsToCourse(courseStudent: AddStudentsToCourseDto): Promise<Course> {
    const studentIds: number[] = map(courseStudent.students, student => student.id)
    return this.courseRepository.addStudentsToCourse(courseStudent.courseId, studentIds)
  }

  async approveRequest(notification: ApproveCourseNotificationDto) {
    await this.notificationRepository.removeNotification(notification.id)
    return this.courseRepository.addStudentsToCourse(notification.course.id, [notification.user.id])
  }

  async getCoursesByStudentId(studentId: number): Promise<Course[]> {
    return this.courseRepository.getCoursesByStudentId(studentId)
  }
}