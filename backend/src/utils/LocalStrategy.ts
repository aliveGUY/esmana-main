import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/services/authService';
import { LoginUserDto } from 'src/models/dto/LoginUserDto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'username', passwordField: 'password' });
  }

  async validate(username: string, password: string): Promise<any> {
    const loginDto = new LoginUserDto();
    loginDto.username = username;
    loginDto.password = password;

    return await this.authService.validateUser(loginDto);
  }
}
