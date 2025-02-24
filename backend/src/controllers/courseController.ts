import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/guards/AuthenticatedGuard';
import { Course } from 'src/models/Course';
import { CreateCourseDto } from 'src/models/dto/CreateCourseDto';
import { CourseService } from 'src/services/courseService';

@Controller('/course')
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

  @Post()
  @UseGuards(AuthenticatedGuard)
  createCourse(@Body() course: CreateCourseDto): Promise<Course> {
    return this.courseService.createCourse(course)
  }

  @Get('all')
  @UseGuards(AuthenticatedGuard)
  getAllCourses(): Promise<Course[]> {
    return this.courseService.getAllCourses()
  }

  @Get('active')
  getAllActiveCourses(): Promise<Course[]> {
    return this.courseService.getAllActiveCourses()
  }
}