import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/models/dto/CreateUserDto';
import { GetUserDto } from 'src/models/dto/GetUserDto';
import { UsersService } from 'src/services/usersService';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  getAllUsers(): Promise<GetUserDto[]> {
    return this.usersService.getAllUsers()
  }

  @Post()
  registerUser(@Body() user: CreateUserDto): Promise<GetUserDto> {
    return this.usersService.registerUser(user)
  }

  @Delete()
  deleteUser(@Body('id') id: number): Promise<number> {
    return this.usersService.deleteUser(id)
  }
}