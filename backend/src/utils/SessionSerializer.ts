import { PassportSerializer } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { AuthService } from "src/services/authService";
import { User } from "src/models/User";

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly authService: AuthService) {
    super();
  }

  serializeUser(user: User | any, done: (err: any, id?: any) => void) {
    if (!user || typeof user !== 'object') {
      return done(new Error('Invalid user object'));
    }

    if (user.succeeded === false) {
      return done(new Error('Payment not successful'));
    }

    done(null, user);
  }

  async deserializeUser(payload: any, done: (err: any, user?: User | null) => void) {
    if (!payload || typeof payload !== 'object') {
      return done(new Error('Invalid payload'));
    }

    if (payload.succeeded === false) {
      return done(new Error('Payment not successful'));
    }

    done(null, payload);
  }
}
