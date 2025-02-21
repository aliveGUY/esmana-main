import { PassportSerializer } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { AuthService } from "src/services/authService";
import { User } from "src/models/User";

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly authService: AuthService) {
    super();
  }

  serializeUser(user: User, done: (err: any, id?: any) => void) {
    done(null, user.id);
  }

  async deserializeUser(id: number, done: (err: any, user?: User | null) => void) {
    const foundUser = await this.authService.findUserById(id);
    return foundUser ? done(null, foundUser) : done(null, null);
  }
}
