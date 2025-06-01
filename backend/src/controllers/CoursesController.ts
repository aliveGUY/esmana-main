import { Controller, Post, UseGuards, Get, Param, Req, Body, ForbiddenException } from '@nestjs/common';
import { TokenAuthGuard } from '../guards/TokenAuthGuard';
import { Public } from '../common/decorators/public.decorator';
import { Inject } from '@nestjs/common';
import { ICourseService } from 'src/services/CourseService';
import { StrippedCourseDto } from 'src/models/dto/StrippedCourseDto';
import { Request } from 'express';
import { CreateCourseDto } from 'src/models/dto/CreateCourseDto';
import { DetailedCourseDto } from 'src/models/dto/DetailedCourseDto';
import { ERoles } from 'src/models/enums/ERoles';
import { ITokenRepository } from 'src/repositories/TokenRepository';

@Controller('courses')
export class CoursesController {
  constructor(
    @Inject('ICourseService') private readonly courseService: ICourseService,
    @Inject('ITokenRepository') private readonly tokenRepository: ITokenRepository,
  ) { }

  @Public()
  @Get('')
  async getAllCourses(): Promise<StrippedCourseDto[]> {
    return await this.courseService.getAllCourses()
  }

  @UseGuards(TokenAuthGuard)
  @Post('')
  async createCourse(@Req() request: Request, @Body() course: CreateCourseDto): Promise<DetailedCourseDto> {
    const tokenData = await this.tokenRepository.validateToken(request.cookies?.access_token);

    if (!tokenData || !tokenData.roles.includes(ERoles.ADMIN)) {
      throw new ForbiddenException('Only administrators can create courses');
    }

    return await this.courseService.createCourse(course);
  }

  @UseGuards(TokenAuthGuard)
  @Get('/:id')
  async getCourseById(@Req() request: Request, @Param('id') id: number) {
    return await this.courseService.getCourseById(id, request)
  }

}
