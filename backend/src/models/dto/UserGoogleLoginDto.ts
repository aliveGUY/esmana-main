import { IsEmail, IsString } from "class-validator";

export class UserGoogleLoginDto {
  @IsString()
  googleId: string;

  @IsEmail()
  email: string
}
