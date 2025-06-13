import { Controller, Post, Body, Res, Req, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { Response, Request } from 'express';
import { UserLoginDto } from '../models/dto/UserLoginDto';
import { UserGoogleLoginDto } from '../models/dto/UserGoogleLoginDto';
import { IAuthService } from '../services/AuthService';
import { Public } from '../common/publicDecorator';
import { Inject } from '@nestjs/common';
import { UserDto } from '../models/dto/UserDto';
import { UserRegistrationDto } from 'src/models/dto/UserRegistrationDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('IAuthService') private readonly authService: IAuthService,
  ) { }

  @Public()
  @Post('register')
  @UseInterceptors(FileInterceptor('profilePicture'))
  async register(
    @UploadedFile() profilePicture: Express.Multer.File,
    @Body('data') dataJson: string
  ): Promise<UserDto> {
    const newAccountData: UserRegistrationDto = JSON.parse(dataJson)
    return await this.authService.registerUser(newAccountData, profilePicture)
  }

  @Public()
  @Post('login')
  async login(
    @Body() dto: UserLoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<UserDto> {
    return await this.authService.loginLocal(response, dto);
  }

  @Post('refresh')
  async refresh(
    @Req() request: Request,
  ): Promise<UserDto> {
    return await this.authService.refresh(request);
  }

  @Public()
  @Post('google/login')
  async googleLogin(
    @Body() dto: UserGoogleLoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<UserDto> {
    return await this.authService.loginGoogle(response, dto);
  }

  @Put('google/connect')
  async googleConnect(
    @Req() request: Request,
    @Body() dto: { token: string }
  ): Promise<void> {
    return await this.authService.connectGoogle(dto.token, request)
  }

  @Post('logout')
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ message: string }> {
    await this.authService.logout(response, request.cookies.access_token);

    return { message: 'Logged out successfully' };
  }
}
