import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { LocalAuthGuard } from 'src/guards/LocalGuard';

@Controller('/auth')
export class AuthController {
  @Post()
  @UseGuards(LocalAuthGuard)
  loginUser(@Req() req: Request) {
    return req.user;
  }
}