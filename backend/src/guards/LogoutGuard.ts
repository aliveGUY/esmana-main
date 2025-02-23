import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LogoutGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

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
