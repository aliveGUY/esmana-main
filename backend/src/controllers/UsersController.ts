import { Controller, UseGuards, Get, Query, Inject, Post, ForbiddenException, Req, UseInterceptors, UploadedFile, Body, Param, Put } from '@nestjs/common';
import { TokenAuthGuard } from '../guards/TokenAuthGuard';
import { IUserService } from 'src/services/UserService';
import { User } from 'src/models/User';
import { ERoles } from 'src/models/enums/ERoles';
import { Request } from 'express';
import { ITokenRepository } from 'src/repositories/TokenRepository';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserRegistrationDto } from 'src/models/dto/UserRegistrationDto';
import { EditUserDto } from 'src/models/dto/EditUserDto';

@Controller('users')
export class UserController {
  constructor(
    @Inject('IUserService') private readonly userService: IUserService,
    @Inject('ITokenRepository') private readonly tokenRepository: ITokenRepository,

  ) { }

  @UseGuards(TokenAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('profilePicture'))
  async createAccount(
    @Req() request: Request,
    @UploadedFile() profilePicture: Express.Multer.File,
    @Body('data') dataJson: string
  ): Promise<User> {
    const tokenData = await this.tokenRepository.validateToken(request.cookies?.access_token);

    if (!tokenData || !tokenData.roles.includes(ERoles.ADMIN)) {
      throw new ForbiddenException('Only administrators can create accounts manually');
    }

    const user: UserRegistrationDto = JSON.parse(dataJson)
    return await this.userService.createAccount(user, profilePicture)
  }

  @UseGuards(TokenAuthGuard)
  @Put()
  @UseInterceptors(FileInterceptor('profilePicture'))
  async editAccount(
    @Req() request: Request,
    @UploadedFile() profilePicture: Express.Multer.File,
    @Body('data') dataJson: string
  ): Promise<User> {
    const tokenData = await this.tokenRepository.validateToken(request.cookies?.access_token);

    if (!tokenData || !tokenData.roles.includes(ERoles.ADMIN)) {
      throw new ForbiddenException('Only administrators can modify accounts manually');
    }

    const user: EditUserDto = JSON.parse(dataJson)
    return await this.userService.editAccount(user, profilePicture)
  }

  @UseGuards(TokenAuthGuard)
  @Get('')
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers()
  }

  @UseGuards(TokenAuthGuard)
  @Get('search')
  async searchUser(@Query('mail') mail: string): Promise<User[]> {
    return await this.userService.searchUsers(mail)
  }

  @UseGuards(TokenAuthGuard)
  @Get(':userId')
  async getUserById(@Param('userId') userId: number): Promise<User> {
    return await this.userService.getUserById(userId)
  }
}