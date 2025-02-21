import { PassportSerializer } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { AuthService } from "src/services/authService";
import { User } from "src/models/User";
import { isEmpty } from "lodash";

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly authService: AuthService) {
    super();
  }

  serializeUser(user: User, done: (err: any, user: User | null) => void) {
    done(null, user);
  }


  async deserializeUser(user: User, done: (err: any, user: User | null) => void) {
    const foundUser = await this.authService.findUserById(user.id);

    if (isEmpty(foundUser)) return done(null, null);
    return done(null, foundUser)
  }
}
