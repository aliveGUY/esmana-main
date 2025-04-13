import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from 'src/services/authService';

@Injectable()
export class LogoutGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    // Delete session from Redis if needed
    if (request.sessionID) {
      await this.authService.deleteSession(request.sessionID);
    }

    return new Promise((resolve) => {
      request.logout((err) => {
        if (err) {
          response.status(500).json({ message: "Logout failed" });
          return resolve(false);
        }

        request.session.destroy((err) => {
          if (err) {
            response.status(500).json({ message: "Failed to destroy session" });
            return resolve(false);
          }

          response.clearCookie('sh')
          response.status(200).json({ message: "Logged out successfully" });
          return resolve(false)
        });
      });
    });
  }
}
