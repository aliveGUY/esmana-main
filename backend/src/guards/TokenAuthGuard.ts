import { Injectable, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common';
import { CanActivate } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Response, Request } from 'express';
import { ITokenRepository } from '../repositories/TokenRepository';
import { IAuthService } from '../services/AuthService';
import { TokenType } from '../models/enums';

@Injectable()
export class TokenAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject('ITokenRepository') private readonly tokenRepository: ITokenRepository,
    @Inject('IAuthService') private readonly authService: IAuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Check if route is marked as public
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const accessToken = request.cookies?.access_token;

    if (!accessToken) {
      throw new UnauthorizedException('No access token provided');
    }

    try {
      // Try to validate access token
      let tokenData = await this.tokenRepository.validateToken(accessToken);
      
      if (!tokenData) {
        // Access token invalid/expired - try to refresh
        const refreshResult = await this.authService.refreshToken(accessToken);
        
        if (!refreshResult) {
          throw new UnauthorizedException('Token refresh failed');
        }

        // Set new access token cookie
        this.setAccessTokenCookie(response, refreshResult.accessToken);
        
        // Validate new token
        tokenData = await this.tokenRepository.validateToken(refreshResult.accessToken);
        
        if (!tokenData) {
          throw new UnauthorizedException('New token validation failed');
        }
      }

      // Ensure it's an access token
      if (tokenData.type !== TokenType.ACCESS) {
        throw new UnauthorizedException('Invalid token type');
      }

      // Attach user data to request
      request.user = {
        id: tokenData.userId,
        email: tokenData.email,
        roles: tokenData.roles,
      };

      return true;
    } catch (error) {
      throw new UnauthorizedException('Token validation failed');
    }
  }

  private setAccessTokenCookie(response: Response, accessToken: string): void {
    response.cookie('access_token', accessToken, {
      httpOnly: true,        // Not accessible via JavaScript
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      sameSite: 'strict',    // CSRF protection
      maxAge: 15 * 60 * 1000, // 15 minutes
    });
  }
}
