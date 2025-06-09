import { Controller, Get, Query, Inject, UseInterceptors, UploadedFile, Body, Param, Put } from '@nestjs/common';
import { IUserService } from 'src/services/UserService';
import { User } from 'src/models/User';
import { FileInterceptor } from '@nestjs/platform-express';
import { EditUserDto } from 'src/models/dto/EditUserDto';
import { Express } from 'express';
import { AdminOnly } from 'src/common/adminOnlyDecorator';

@Controller('users')
export class UserController {
  constructor(
    @Inject('IUserService') private readonly userService: IUserService,
  ) { }

  @Put()
  @AdminOnly()
  @UseInterceptors(FileInterceptor('profilePicture'))
  async editAccount(
    @UploadedFile() profilePicture: Express.Multer.File,
    @Body('data') dataJson: string
  ): Promise<User> {
    const user: EditUserDto = JSON.parse(dataJson)
    return await this.userService.editAccount(user, profilePicture)
  }

  @Get('')
  @AdminOnly()
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers()
  }

  @AdminOnly()
  @Get('search')
  async searchUser(@Query('mail') mail: string): Promise<User[]> {
    return await this.userService.searchUsers(mail)
  }

  @AdminOnly()
  @Get(':userId')
  async getUserById(@Param('userId') userId: number): Promise<User> {
    return await this.userService.getUserById(userId)
  }
}