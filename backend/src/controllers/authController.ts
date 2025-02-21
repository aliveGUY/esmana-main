import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthenticatedGuard } from 'src/guards/AuthenticatedGuard';
import { LocalAuthGuard } from 'src/guards/LocalGuard';

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
    console.log("Session User:", req.user);
    return req.user
  }
}