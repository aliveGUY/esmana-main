import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/models/dto/CreateUserDto';
import { GetUserDto } from 'src/models/dto/GetUserDto';
import { UsersService } from 'src/services/usersService';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  getAllUsers(): GetUserDto[] {
    return this.usersService.getAllUsers()
  }

  @Post()
  registerUser(@Body() user: CreateUserDto): GetUserDto {
    return this.usersService.registerUser(user)
  }
}