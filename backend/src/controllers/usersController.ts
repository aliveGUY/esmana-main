import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/AuthGuard';
import { GetUserDto } from 'src/models/dto/GetUserDto';
import { MemberRegistrationDto } from 'src/models/dto/MemberRegistrationDto';
import { StudentRegistrationDto } from 'src/models/dto/StudentRegistrationDto';
import { StudentToMemberDto } from 'src/models/dto/StudentToMemberDto';
import { User } from 'src/models/User';
import { IdentityService } from 'src/services/identityService';
import { UsersService } from 'src/services/usersService';

@Controller('/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly identityService: IdentityService,
  ) { }

  @Post('student')
  registerStudent(@Body() user: StudentRegistrationDto): Promise<GetUserDto> {
    return this.usersService.registerStudent(user)
  }

  @Post('member')
  registerMember(@Body() user: MemberRegistrationDto): Promise<GetUserDto> {
    return this.usersService.registerMember(user)
  }

  @Put('student-to-member')
  @UseGuards(AuthGuard)
  extendStudentToMember(@Body() user: StudentToMemberDto): Promise<void> {
    return this.identityService.extendStudentToMember(user)
  }

  @Get()
  @UseGuards(AuthGuard)
  getAllUsers(): Promise<GetUserDto[]> {
    return this.usersService.getAllUsers()
  }

  @Delete()
  @UseGuards(AuthGuard)
  deleteUser(@Body('id') id: number): Promise<number> {
    return this.usersService.deleteUser(id)
  }


  @Get('check-complete/:id')
  @UseGuards(AuthGuard)
  checkIsIdentityComplete(@Param('id') userId: string): Promise<boolean> {
    return this.identityService.checkIsIdentityComplete(Number(userId));
  }

  @Get('mail-search/:partialEmail')
  searchForUserByEmail(@Param('partialEmail') partialEmail: string): Promise<GetUserDto[]> {
    return this.usersService.searchForUserByEmail(partialEmail)
  }

  @Get('cabinet/:id')
  getUserById(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findUserById(Number(id))
  }
}
