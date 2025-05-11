import { Body, Controller, Get, Post, Put, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { isEmpty } from 'lodash';
import { AuthGuard } from 'src/guards/AuthGuard';
import { LoginGuard } from 'src/guards/LoginGuard';
import { LogoutGuard } from 'src/guards/LogoutGuard';
import { AuthService } from 'src/services/authService';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  @UseGuards(LoginGuard)
  loginUser(@Req() req: Request) {
    // Login is handled by the LocalAuthGuard
    return req.user;
  }

  @Get()
  @UseGuards(AuthGuard)
  getSession(@Req() req: Request) {
    return req.user
  }

  @Post('logout')
  @UseGuards(LogoutGuard)
  logoutUser() {
    // Logout is handled by the LogoutGuard
  }

  @Put('pass')
  @UseGuards(AuthGuard)
  changePassword(@Req() req: Request, @Body() passwords) {
    if (isEmpty(req.user)) throw new UnauthorizedException()
    return this.authService.changePassword(req.user, passwords)
  }

  @Post('check')
  checkIfUserExist(@Body() user): Promise<boolean> {
    return this.authService.checkIfUserExist(user)
  }
}
