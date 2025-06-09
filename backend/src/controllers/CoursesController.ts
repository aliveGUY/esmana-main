import { Controller, Post, Get, Param, Req, Body, UseInterceptors, UploadedFile, Put } from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';
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
  @UseInterceptors(FileInterceptor('thumbnail'))
  async createCourse(
    @Req() request: Request,
    @UploadedFile() thumbnail: Express.Multer.File,
    @Body('data') dataJson: string,
  ): Promise<DetailedCourseDto> {
    // const tokenData = await this.tokenRepository.validateToken(request.cookies?.access_token);

    // if (!tokenData || !tokenData.roles.includes(ERoles.ADMIN)) {
    //   throw new ForbiddenException('Only administrators can create courses');
    // }

    const courseDto: CreateCourseDto = JSON.parse(dataJson)
    return await this.courseService.createCourse(courseDto, thumbnail);
  }

  @Put('')
  @UseInterceptors(FileInterceptor('thumbnail'))
  async editCourse(
    @Req() request: Request,
    @UploadedFile() thumbnail: Express.Multer.File,
    @Body('data') dataJson: string,
  ): Promise<DetailedCourseDto> {
    // const tokenData = await this.tokenRepository.validateToken(request.cookies?.access_token);

    // if (!tokenData || !tokenData.roles.includes(ERoles.ADMIN)) {
    //   throw new ForbiddenException('Only administrators can edit courses');
    // }

    const courseDto: EditCourseDto = JSON.parse(dataJson)
    return await this.courseService.editCourse(courseDto, thumbnail)
  }

  @Public()
  @Get('/:id')
  async getCourseById(@Req() request: Request, @Param('id') id: number) {
    return await this.courseService.getCourseById(id, request)
  }

}
