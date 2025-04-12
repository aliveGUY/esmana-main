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
    // Check if this is a temporary user (with non-numeric ID)
    if (typeof user.id !== 'number') {
      // For temporary users, serialize the whole user object
      done(null, user);
    } else {
      // For regular users, just serialize the ID
      done(null, user.id);
    }
  }

  async deserializeUser(payload: number | any, done: (err: any, user?: User | null) => void) {
    // Check if this is a serialized temporary user
    if (typeof payload === 'object' && payload.id && typeof payload.id !== 'number') {
      // For temporary users, return the whole object
      return done(null, payload);
    }
    
    // For regular users, look up by ID
    const foundUser = await this.authService.findUserById(payload);
    return foundUser ? done(null, foundUser) : done(null, null);
  }
}
