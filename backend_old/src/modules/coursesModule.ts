import { Module } from '@nestjs/common';
import { CoursesController } from 'src/controllers/coursesController';

@Module({
  imports: [],
  controllers: [CoursesController],
  providers: [],
  exports: [],
})
export class CoursesModule { }
