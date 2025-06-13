import { Injectable, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common';
import { CanActivate } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';
import { ITokenRepository, ONE_DAY } from '../repositories/TokenRepository';
import { AccessTokenData } from 'src/models/Token';
import { ERoles } from 'src/models/enums/ERoles';

@Injectable()
export class TokenAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject('ITokenRepository') private tokenRepo: ITokenRepository,
  ) { }
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [ctx.getHandler(), ctx.getClass()])
    const isAdminOnly = this.reflector.getAllAndOverride<boolean>('isAdminOnly', [ctx.getHandler(), ctx.getClass()])

    if (isPublic) return true;

    const req = ctx.switchToHttp().getRequest<Request>();
    const res = ctx.switchToHttp().getResponse<Response>();
    const token = req.cookies?.access_token;

    if (!token) throw new UnauthorizedException('No access token');

    const isAccessTokenValid = !await this.tokenRepo.isAccessTokenExpired(token)

    if (isAccessTokenValid) {
      const data = await this.tokenRepo.getAccessTokenData(token)

      req.user = { userId: data.userId, email: data.email, roles: data.roles } as AccessTokenData;
    }

    const refreshToken = await this.tokenRepo.getRefreshToken(token)

    if (!isAccessTokenValid && refreshToken) {
      const refreshTokenData = await this.tokenRepo.refreshAccessToken(refreshToken)

      res.cookie('access_token', refreshTokenData.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: ONE_DAY,
      });

      req.user = {
        userId: refreshTokenData.userId,
        email: refreshTokenData.email,
        roles: refreshTokenData.roles
      } as AccessTokenData;
    }

    const isAdmin = (req.user as AccessTokenData)?.roles.includes(ERoles.ADMIN)

    if (!isAdmin && isAdminOnly) throw new UnauthorizedException()

    if (!refreshToken || refreshToken === null) throw new UnauthorizedException()

    return true
  }
}
