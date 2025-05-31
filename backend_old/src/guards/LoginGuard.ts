import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "src/services/authService";

@Injectable()
export class LoginGuard extends AuthGuard('local') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    
    // Handle login with express-session
    await super.logIn(request);
    
    // Save session data if needed
    if (request.user && request.sessionID) {
      const sessionData = {
        userId: request.user.id,
        email: request.user.email,
        loginTime: new Date().toISOString(),
      };
      
      await this.authService.saveSession(request.sessionID, sessionData);
    }
    
    return result;
  }
}
