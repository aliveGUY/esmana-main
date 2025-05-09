import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/AuthGuard';
import { Course } from 'src/models/Course';
import { RemoveStudentFromCourseDto } from 'src/models/dto/RemoveStudentFromCourseDto';
import { CreateCourseDto } from 'src/models/dto/CreateCourseDto';
import { SetCourseStatusDto } from 'src/models/dto/SetCourseStatusDto';
import { CourseService } from 'src/services/courseService';
import { AddStudentsToCourseDto } from 'src/models/dto/AddStudentsToCourseDto';

@Controller('/course')
export class CourseController {
  constructor(private readonly courseService: CourseService,
  ) { }

  @Post()
  @UseGuards(AuthGuard)
  createCourse(@Body() course: CreateCourseDto): Promise<Course> {
    return this.courseService.createCourse(course)
  }

  @Get('all')
  @UseGuards(AuthGuard)
  getAllCourses(): Promise<Course[]> {
    return this.courseService.getAllCourses()
  }

  @Get('active')
  getAllActiveCourses(): Promise<Course[]> {
    return this.courseService.getAllActiveCourses()
  }

  @Put('set-status')
  @UseGuards(AuthGuard)
  setCourseStatus(@Body() course: SetCourseStatusDto): Promise<Course> {
    return this.courseService.setCourseStatus(course)
  }

  @Delete('student')
  @UseGuards(AuthGuard)
  removeStudentFromCourse(@Body() courseStudent: RemoveStudentFromCourseDto) {
    return this.courseService.removeStudentFromCourse(courseStudent)
  }

  @Post('student')
  @UseGuards(AuthGuard)
  addStudentsToCourse(@Body() courseStudent: AddStudentsToCourseDto): Promise<Course> {
    return this.courseService.addStudentsToCourse(courseStudent)
  }

  @Get('student/:id')
  @UseGuards(AuthGuard)
  getCoursesByStudentId(@Param('id') studentId: string): Promise<Course[]> {
    return this.courseService.getCoursesByStudentId(Number(studentId))
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteCourse(@Param('id') courseId: string): Promise<number> {
    return this.courseService.deleteCourse(courseId)
  }
}
