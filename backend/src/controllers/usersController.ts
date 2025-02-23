import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/guards/AuthenticatedGuard';
import { GetUserDto } from 'src/models/dto/GetUserDto';
import { MemberRegistrationDto } from 'src/models/dto/MemberRegistrationDto';
import { StudentRegistrationDto } from 'src/models/dto/StudentRegistrationDto';
import { StudentToMemberDto } from 'src/models/dto/StudentToMemberDto';
import { UsersService } from 'src/services/usersService';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('student')
  registerStudent(@Body() user: StudentRegistrationDto): Promise<GetUserDto> {
    return this.usersService.registerStudent(user)
  }

  @Post('member')
  registerMember(@Body() user: MemberRegistrationDto) {

  }

  @Post('student-to-member')
  extendUser(@Body() user: StudentToMemberDto) {

  }

  @Get()
  @UseGuards(AuthenticatedGuard)
  getAllUsers(): Promise<GetUserDto[]> {
    return this.usersService.getAllUsers()
  }

  @Delete()
  @UseGuards(AuthenticatedGuard)
  deleteUser(@Body('id') id: number): Promise<number> {
    return this.usersService.deleteUser(id)
  }
}