import { Controller, UseGuards, Get, Query, Inject } from '@nestjs/common';
import { TokenAuthGuard } from '../guards/TokenAuthGuard';
import { IUserService } from 'src/services/UserService';
import { User } from 'src/models/User';

@Controller('users')
export class UserController {
  constructor(
    @Inject('IUserService') private readonly userService: IUserService,
  ) { }

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
}
