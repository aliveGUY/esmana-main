import { Body, Controller, Post } from '@nestjs/common';

@Controller('/courses')
export class CoursesController {
  @Post()
  loginUser(@Body() course) {
    console.log("test")
  }
}
