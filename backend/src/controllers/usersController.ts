import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/AuthGuard';
import { User } from 'src/models/User';
import { UsersService } from 'src/services/usersService';

@Controller('/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) { }

  @Post('student')
  registerStudent(@Body() user): Promise<any> {
    return this.usersService.registerStudent(user)
  }

  @Post('member')
  registerMember(@Body() user): Promise<any> {
    return this.usersService.registerMember(user)
  }

  @Get()
  @UseGuards(AuthGuard)
  getAllUsers(): Promise<any[]> {
    return this.usersService.getAllUsers()
  }

  @Delete()
  @UseGuards(AuthGuard)
  deleteUser(@Body('id') id: number): Promise<number> {
    return this.usersService.deleteUser(id)
  }


  @Get('mail-search/:partialEmail')
  searchForUserByEmail(@Param('partialEmail') partialEmail: string): Promise<any[]> {
    return this.usersService.searchForUserByEmail(partialEmail)
  }

  @Get('cabinet/:id')
  getUserById(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findUserById(Number(id))
  }
}
