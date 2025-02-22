import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/guards/AuthenticatedGuard';
import { CreateUserDto } from 'src/models/dto/CreateUserDto';
import { GetUserDto } from 'src/models/dto/GetUserDto';
import { UsersService } from 'src/services/usersService';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  registerUser(@Body() user: CreateUserDto): Promise<GetUserDto> {
    return this.usersService.registerUser(user)
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