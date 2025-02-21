import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthenticatedGuard } from 'src/guards/AuthenticatedGuard';
import { LocalAuthGuard } from 'src/guards/LocalGuard';
import { LogoutGuard } from 'src/guards/LogoutGuard';

@Controller('/auth')
export class AuthController {
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

  @Post('/logout')
  @UseGuards(LogoutGuard)
  logoutUser() {
    return
  }
}