import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/guards/AuthenticatedGuard';
import { Course } from 'src/models/Course';
import { RemoveStudentFromCourseDto } from 'src/models/dto/RemoveStudentFromCourseDto';
import { CreateCourseDto } from 'src/models/dto/CreateCourseDto';
import { SetCourseStatusDto } from 'src/models/dto/SetCourseStatusDto';
import { CourseService } from 'src/services/courseService';
import { AddStudentsToCourseDto } from 'src/models/dto/AddStudentsToCourseDto';
import { ApproveCourseNotificationDto } from 'src/models/dto/ApproveCourseNotificationDto';

@Controller('/course')
export class CourseController {
  constructor(private readonly courseService: CourseService,
  ) { }

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

  @Put('set-status')
  @UseGuards(AuthenticatedGuard)
  setCourseStatus(@Body() course: SetCourseStatusDto): Promise<Course> {
    return this.courseService.setCourseStatus(course)
  }

  @Delete('student')
  @UseGuards(AuthenticatedGuard)
  removeStudentFromCourse(@Body() courseStudent: RemoveStudentFromCourseDto) {
    return this.courseService.removeStudentFromCourse(courseStudent)
  }

  @Post('student')
  @UseGuards(AuthenticatedGuard)
  addStudentsToCourse(@Body() courseStudent: AddStudentsToCourseDto): Promise<Course> {
    return this.courseService.addStudentsToCourse(courseStudent)
  }

  @Post('approve-request')
  @UseGuards(AuthenticatedGuard)
  approveJoinRequest(@Body() notification: ApproveCourseNotificationDto) {
    return this.courseService.approveRequest(notification)
  }

  @Get('student/:id')
  @UseGuards(AuthenticatedGuard)
  getCoursesByStudentId(@Param('id') studentId: string): Promise<Course[]> {
    return this.courseService.getCoursesByStudentId(Number(studentId))
  }

  @Delete(':id')
  @UseGuards(AuthenticatedGuard)
  deleteCourse(@Param('id') courseId: string): Promise<number> {
    return this.courseService.deleteCourse(courseId)
  }
}