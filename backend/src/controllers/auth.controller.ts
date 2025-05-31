import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Req,
  Res,
  HttpCode,
  HttpStatus,
  Inject,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { IAuthService } from '../services/auth.service';
import { LoginDto, RegisterDto, RefreshTokenDto, AuthResponse } from '../models/auth.dto';
import { GoogleAuthGuard } from '../guards/google-auth.guard';
import { TokenAuthGuard } from '../guards/token-auth.guard';
import { Public } from '../common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('IAuthService') private readonly authService: IAuthService,
  ) { }

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body(ValidationPipe) registerDto: RegisterDto,
  ): Promise<AuthResponse> {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body(ValidationPipe) loginDto: LoginDto,
  ): Promise<AuthResponse> {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @Body(ValidationPipe) refreshTokenDto: RefreshTokenDto,
  ): Promise<AuthResponse> {
    return this.authService.refreshToken(refreshTokenDto);
  }

  @UseGuards(TokenAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Req() req: Request): Promise<void> {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (token) {
      await this.authService.logout(token);
    }
  }

  @Public()
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(): Promise<void> {
    // This route initiates Google OAuth flow
    // The actual logic is handled by the GoogleAuthGuard
  }

  @Public()
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const user = req.user as any;

      if (!user) {
        throw new Error('No user found');
      }

      // Generate auth response directly since user is already validated
      const authResponse = await this.generateAuthResponseForUser(user);

      // Redirect to frontend with tokens
      const frontendUrl = process.env.FRONTEND_SUCCESS_URL || 'http://localhost:3001/dashboard';
      const redirectUrl = `${frontendUrl}?accessToken=${authResponse.accessToken}&refreshToken=${authResponse.refreshToken}`;

      res.redirect(redirectUrl);
    } catch (error) {
      const frontendUrl = process.env.FRONTEND_FAILURE_URL || 'http://localhost:3001/login?error=auth_failed';
      res.redirect(frontendUrl);
    }
  }

  private async generateAuthResponseForUser(user: any): Promise<AuthResponse> {
    // This is a simplified version - in a real app you might want to create a separate method in the auth service
    const googleUserDto = {
      googleId: user.googleId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profilePicture: user.profilePicture,
    };

    return this.authService.googleAuth(googleUserDto);
  }
}
