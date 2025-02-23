import { Body, Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthenticatedGuard } from 'src/guards/AuthenticatedGuard';
import { LocalAuthGuard } from 'src/guards/LocalGuard';
import { LogoutGuard } from 'src/guards/LogoutGuard';
import { ChangePasswordDto } from 'src/models/dto/ChangePasswordDto';
import { CheckIfUserExistDto } from 'src/models/dto/CheckIfUserExistDto';
import { AuthService } from 'src/services/authService';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  @UseGuards(LocalAuthGuard)
  loginUser(@Req() req: Request) {
    return req.user;
  }

  @Get()
  @UseGuards(AuthenticatedGuard)
  getSession(@Req() req: Request) {
    return req.user
  }

  @Post('logout')
  @UseGuards(LogoutGuard)
  logoutUser() { }

  @Put('pass')
  changePassword(@Body() passwords: ChangePasswordDto) {

  }

  @Post('check')
  checkIfUserExist(@Body() user: CheckIfUserExistDto): Promise<boolean> {
    return this.authService.checkIfUserExist(user)
  }
}