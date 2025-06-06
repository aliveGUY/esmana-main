import { Controller, Post, Body, Res, Req, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { UserLoginDto } from '../models/dto/UserLoginDto';
import { UserGoogleLoginDto } from '../models/dto/UserGoogleLoginDto';
import { IAuthService } from '../services/AuthService';
import { TokenAuthGuard } from '../guards/TokenAuthGuard';
import { Public } from '../common/decorators/public.decorator';
import { Inject } from '@nestjs/common';
import { UserDto } from '../models/dto/UserDto';
import { UserRegistrationDto } from 'src/models/dto/UserRegistrationDto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('IAuthService') private readonly authService: IAuthService,
  ) { }

  @Public()
  @Post('register')
  async register(
    @Body() newAccountData: UserRegistrationDto
  ): Promise<UserDto> {
    return await this.authService.registerUser(newAccountData)
  }

  @Public()
  @Post('login')
  async login(
    @Body() dto: UserLoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<UserDto> {
    const { user, accessToken } = await this.authService.loginLocal(dto);

    this.setAccessTokenCookie(response, accessToken);
    return user
  }

  @Public()
  @Post('google/login')
  async googleLogin(
    @Body() dto: UserGoogleLoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<UserDto> {
    const { user, accessToken } = await this.authService.loginGoogle(dto);

    this.setAccessTokenCookie(response, accessToken);
    return user
  }

  @Public()
  @Post('refresh')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<UserDto> {
    const accessToken = request.cookies?.access_token;

    if (!accessToken) {
      throw new Error('No access token found');
    }

    const result = await this.authService.refreshToken(accessToken);

    if (!result) {
      throw new Error('Token refresh failed');
    }

    this.setAccessTokenCookie(response, result.accessToken);

    return result.user
  }

  @UseGuards(TokenAuthGuard)
  @Post('logout')
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ message: string }> {
    const accessToken = request.cookies?.access_token;

    if (accessToken) {
      await this.authService.logout(accessToken);
    }

    // Clear access token cookie
    response.clearCookie('access_token');

    return { message: 'Logged out successfully' };
  }

  private setAccessTokenCookie(response: Response, accessToken: string): void {
    response.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000,
    });
  }
}
