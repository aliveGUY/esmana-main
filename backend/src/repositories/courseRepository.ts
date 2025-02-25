import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Course } from "src/models/Course";
import { CreateCourseDto } from "src/models/dto/CreateCourseDto";
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
    return this.course.find({ relations: ['lectures', 'lectures.speakers', 'students'] })
  }

  async getAllActiveCourses(): Promise<Course[]> {
    return this.course.find({ where: { active: true }, relations: ['lectures', 'lectures.speakers', 'students'] })
  }
}