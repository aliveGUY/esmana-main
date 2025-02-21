import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/guards/AuthenticatedGuard';
import { CreateUserDto } from 'src/models/dto/CreateUserDto';
import { GetUserDto } from 'src/models/dto/GetUserDto';
import { UsersService } from 'src/services/usersService';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @UseGuards(AuthenticatedGuard)
  getAllUsers(): Promise<GetUserDto[]> {
    return this.usersService.getAllUsers()
  }

  @Post()
  @UseGuards(AuthenticatedGuard)
  registerUser(@Body() user: CreateUserDto): Promise<GetUserDto> {
    return this.usersService.registerUser(user)
  }

  @Delete()
  @UseGuards(AuthenticatedGuard)
  deleteUser(@Body('id') id: number): Promise<number> {
    return this.usersService.deleteUser(id)
  }
}