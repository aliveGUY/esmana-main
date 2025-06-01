import { IsString, IsEnum, IsDate, IsBoolean, IsOptional } from 'class-validator';
import { ETokenType } from '../enums/ETokenType';

export class TokenDto {
  @IsString()
  id: string;

  @IsString()
  userId: string;

  @IsEnum(ETokenType)
  type: ETokenType;

  @IsString()
  token: string;

  @IsDate()
  expiresAt: Date;

  @IsBoolean()
  isRevoked: boolean;
}

export class TokenDataDto {
  @IsString()
  userId: string;

  @IsEnum(ETokenType)
  type: ETokenType;

  @IsString()
  email: string;

  @IsString({ each: true })
  roles: string[];

  @IsOptional()
  @IsString()
  refreshTokenId?: string;
}
