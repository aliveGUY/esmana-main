import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { LoginUserDto } from "src/models/dto/LoginUserDto";
import { AuthService } from "src/services/authService";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: "phoneOrEmail" });
  }

  async validate(phoneOrEmail: string, password: string): Promise<any> {
    const loginDto = new LoginUserDto();
    loginDto.phoneOrEmail = phoneOrEmail;
    loginDto.password = password;

    const user = await this.authService.validateUser(loginDto);

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return user;
  }
}
