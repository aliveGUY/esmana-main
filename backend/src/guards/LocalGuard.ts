import { ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    console.log('TEST1');
    try {
      const result = (await super.canActivate(context)) as boolean;
      console.log('TEST2');
      const request = context.switchToHttp().getRequest();
      await super.logIn(request);
      console.log({ result });
      return result;
    } catch (error) {
      console.error('AUTH ERROR:', error);
      throw error; // Re-throw to propagate error properly
    }
  }
}