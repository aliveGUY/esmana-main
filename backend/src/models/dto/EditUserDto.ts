import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";
import { LectorDetailsDto } from "./EditLectorDetailsDto";
import { ERoles } from "../enums/ERoles";

export class EditUserDto {
  id: number

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

  lectorDetails?: LectorDetailsDto

  roles: ERoles[]

}