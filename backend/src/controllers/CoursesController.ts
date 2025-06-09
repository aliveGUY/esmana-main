import { Controller, Post, Get, Param, Req, Body, UseInterceptors, UploadedFile, Put } from '@nestjs/common';
import { Public } from '../common/publicDecorator';
import { Inject } from '@nestjs/common';
import { ICourseService } from 'src/services/CourseService';
import { StrippedCourseDto } from 'src/models/dto/StrippedCourseDto';
import { Request } from 'express';
import { CreateCourseDto } from 'src/models/dto/CreateCourseDto';
import { DetailedCourseDto } from 'src/models/dto/DetailedCourseDto';
import { ITokenRepository } from 'src/repositories/TokenRepository';
import { FileInterceptor } from '@nestjs/platform-express';
import { EditCourseDto } from 'src/models/dto/EditCourseDto';
import { Express } from 'express';
import { AdminOnly } from 'src/common/adminOnlyDecorator';

@Controller('courses')
export class CoursesController {
  constructor(
    @Inject('ICourseService') private readonly courseService: ICourseService,
    @Inject('ITokenRepository') private readonly tokenRepository: ITokenRepository,
  ) { }

  @Get('')
  async getAllCourses(@Req() request: Request): Promise<StrippedCourseDto[]> {
    return await this.courseService.getAllCourses(request)
  }

  @Public()
  @Get('active')
  async getAllActiveCourses(): Promise<StrippedCourseDto[]> {
    return await this.courseService.getAllActiveCourses()
  }

  @Post('')
  @AdminOnly()
  @UseInterceptors(FileInterceptor('thumbnail'))
  async createCourse(
    @UploadedFile() thumbnail: Express.Multer.File,
    @Body('data') dataJson: string,
  ): Promise<DetailedCourseDto> {
    const courseDto: CreateCourseDto = JSON.parse(dataJson)
    return await this.courseService.createCourse(courseDto, thumbnail);
  }

  @Put('')
  @AdminOnly()
  @UseInterceptors(FileInterceptor('thumbnail'))
  async editCourse(
    @UploadedFile() thumbnail: Express.Multer.File,
    @Body('data') dataJson: string,
  ): Promise<DetailedCourseDto> {
    const courseDto: EditCourseDto = JSON.parse(dataJson)
    return await this.courseService.editCourse(courseDto, thumbnail)
  }

  @Get('/:id')
  async getCourseById(@Req() request: Request, @Param('id') id: number) {
    return await this.courseService.getCourseById(id, request)
  }
}
