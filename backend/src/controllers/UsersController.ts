import { Controller, Get, Query, Inject, Req, UseInterceptors, UploadedFile, Body, Param, Put } from '@nestjs/common';
import { IUserService } from 'src/services/UserService';
import { User } from 'src/models/User';
import { Request } from 'express';
import { ITokenRepository } from 'src/repositories/TokenRepository';
import { FileInterceptor } from '@nestjs/platform-express';
import { EditUserDto } from 'src/models/dto/EditUserDto';
import { Express } from 'express';

@Controller('users')
export class UserController {
  constructor(
    @Inject('IUserService') private readonly userService: IUserService,
    @Inject('ITokenRepository') private readonly tokenRepository: ITokenRepository,

  ) { }

  @Put()
  @UseInterceptors(FileInterceptor('profilePicture'))
  async editAccount(
    @Req() request: Request,
    @UploadedFile() profilePicture: Express.Multer.File,
    @Body('data') dataJson: string
  ): Promise<User> {
    // const tokenData = await this.tokenRepository.validateToken(request.cookies?.access_token);

    // if (!tokenData || !tokenData.roles.includes(ERoles.ADMIN)) {
    //   throw new ForbiddenException('Only administrators can modify accounts manually');
    // }

    const user: EditUserDto = JSON.parse(dataJson)
    return await this.userService.editAccount(user, profilePicture)
  }

  @Get('')
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers()
  }

  @Get('search')
  async searchUser(@Query('mail') mail: string): Promise<User[]> {
    return await this.userService.searchUsers(mail)
  }

  @Get(':userId')
  async getUserById(@Param('userId') userId: number): Promise<User> {
    return await this.userService.getUserById(userId)
  }
}