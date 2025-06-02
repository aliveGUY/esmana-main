import { Controller, Post, UseGuards, Get, Param, Req, Body, ForbiddenException, UseInterceptors, UploadedFile } from '@nestjs/common';
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
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('courses')
export class CoursesController {
  constructor(
    @Inject('ICourseService') private readonly courseService: ICourseService,
    @Inject('ITokenRepository') private readonly tokenRepository: ITokenRepository,
  ) { }

  @UseGuards(TokenAuthGuard)
  @Get('')
  async getAllCourses(@Req() request: Request): Promise<StrippedCourseDto[]> {
    return await this.courseService.getAllCourses(request)
  }

  @Public()
  @Get('active')
  async getAllActiveCourses(): Promise<StrippedCourseDto[]> {
    return await this.courseService.getAllActiveCourses()
  }

  @UseGuards(TokenAuthGuard)
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

  @UseGuards(TokenAuthGuard)
  @Get('/:id')
  async getCourseById(@Req() request: Request, @Param('id') id: number) {
    return await this.courseService.getCourseById(id, request)
  }

}
