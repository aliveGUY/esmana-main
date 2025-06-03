import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { CreateLectorDetailsDto } from "./CreateLectorDetailsDto";
import { ERoles } from "../enums/ERoles";

export class UserRegistrationDto {
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  firstName: string;

  @IsString()
  @MaxLength(50)
  middleName?: string;

  @IsString()
  @MinLength(1)
  @MaxLength(50)
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password: string;

  @IsOptional()
  lectorDetails?: CreateLectorDetailsDto
  
  @IsOptional()
  roles: ERoles[]
}