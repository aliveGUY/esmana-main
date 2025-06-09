import { Injectable, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common';
import { CanActivate } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';
import { ITokenRepository } from '../repositories/TokenRepository';

@Injectable()
export class TokenAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject('ITokenRepository') private tokenRepo: ITokenRepository,
  ) { }

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    if (this.reflector.getAllAndOverride<boolean>('isPublic', [ctx.getHandler(), ctx.getClass()])) return true;

    const req = ctx.switchToHttp().getRequest<Request>();
    const res = ctx.switchToHttp().getResponse<Response>();
    const token = req.cookies?.access_token;

    if (!token) throw new UnauthorizedException('No access token');

    const isAccessTokenValid = !await this.tokenRepo.isAccessTokenExpired(token)
    if (isAccessTokenValid) {
      const data = await this.tokenRepo.getAccessTokenData(token)
      req.user = { id: data.userId, email: data.email, roles: data.roles };

      return true
    }

    const refreshToken = await this.tokenRepo.getRefreshToken(token)
    if (!isAccessTokenValid && refreshToken) {
      const refreshTokenData = await this.tokenRepo.refreshAccessToken(refreshToken)

      res.cookie('access_token', refreshTokenData.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000,
      });

      req.user = {
        id: refreshTokenData.userId,
        email: refreshTokenData.email,
        roles: refreshTokenData.roles
      };

      return true
    }

    throw new UnauthorizedException()
  }
}
