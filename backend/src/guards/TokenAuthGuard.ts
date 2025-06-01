import { Injectable, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common';
import { CanActivate } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';
import { ITokenRepository } from '../repositories/TokenRepository';
import { IAuthService } from '../services/AuthService';
import { ETokenType } from '../models/enums/ETokenType';

@Injectable()
export class TokenAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject('ITokenRepository') private tokenRepo: ITokenRepository,
    @Inject('IAuthService') private authService: IAuthService,
  ) { }

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    if (this.reflector.getAllAndOverride<boolean>('isPublic', [ctx.getHandler(), ctx.getClass()])) return true;

    const req = ctx.switchToHttp().getRequest<Request>();
    const res = ctx.switchToHttp().getResponse<Response>();
    const token = req.cookies?.access_token;
    if (!token) throw new UnauthorizedException('No access token');

    let data = await this.tokenRepo.validateToken(token);
    if (!data) {
      const refreshed = await this.authService.refreshToken(token);
      if (!refreshed) throw new UnauthorizedException('Token refresh failed');
      this.setCookie(res, refreshed.accessToken);
      data = await this.tokenRepo.validateToken(refreshed.accessToken);
      if (!data) throw new UnauthorizedException('New token invalid');
    }

    if (data.type !== ETokenType.ACCESS) throw new UnauthorizedException('Wrong token type');
    req.user = { id: data.userId, email: data.email, roles: data.roles };
    return true;
  }

  private setCookie(res: Response, token: string) {
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000,
    });
  }
}
