import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class UserGoogleRegistrationDto {
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  firstName: string;

  @IsString()
  @MinLength(1)
  @MaxLength(50)
  middleName?: string;

  @IsString()
  @MinLength(1)
  @MaxLength(50)
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  googleId: string;
}