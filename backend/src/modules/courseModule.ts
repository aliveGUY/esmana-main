import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseController } from 'src/controllers/courseController';
import { Course } from 'src/models/Course';
import { CourseRepository } from 'src/repositories/courseRepository';
import { CourseService } from 'src/services/courseService';

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  controllers: [CourseController],
  providers: [CourseRepository, CourseService],
  exports: [CourseService],
})
export class CourseModule { }