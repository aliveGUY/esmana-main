import { IsBoolean, IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class UserDto {
  @IsString()
  id: number;

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

  @IsBoolean()
  isEmailVerified: boolean

  @IsString()
  profilePicture?: string;

  roles: string[];
}