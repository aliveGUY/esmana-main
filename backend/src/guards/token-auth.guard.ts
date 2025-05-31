import { Injectable, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common';
import { CanActivate } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ITokenService } from '../services/token.service';
import { IUserService } from '../services/user.service';
import { TokenType } from '../models/enums';

@Injectable()
export class TokenAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject('ITokenService') private readonly tokenService: ITokenService,
    @Inject('IUserService') private readonly userService: IUserService,
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

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      // Validate token using Redis
      const tokenData = await this.tokenService.validateToken(token);
      
      if (!tokenData) {
        throw new UnauthorizedException('Invalid token');
      }

      // Ensure it's an access token
      if (tokenData.type !== TokenType.ACCESS) {
        throw new UnauthorizedException('Invalid token type');
      }

      // Get user data
      const user = await this.userService.findById(tokenData.userId);
      
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Attach user to request
      request.user = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles,
        provider: user.provider,
        isEmailVerified: user.isEmailVerified,
      };

      return true;
    } catch (error) {
      throw new UnauthorizedException('Token validation failed');
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
