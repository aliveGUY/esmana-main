import { Injectable } from "@nestjs/common";
import { Course } from "src/models/Course";
import { CreateCourseDto } from "src/models/dto/CreateCourseDto";
import { CourseRepository } from "src/repositories/courseRepository";

@Injectable()
export class CourseService {
  constructor(private readonly courseRepository: CourseRepository) { }

  async createCourse(course: CreateCourseDto): Promise<Course> {
    return this.courseRepository.createCourse(course)
  }

  async getAllCourses(): Promise<Course[]> {
    return this.courseRepository.getAllCourses()
  }

  async getAllActiveCourses(): Promise<Course[]> {
    return this.courseRepository.getAllActiveCourses()
  }
}