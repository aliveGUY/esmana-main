import { IsString } from "class-validator";

export class UserGoogleLoginDto {
  @IsString()
  token: string;
}
