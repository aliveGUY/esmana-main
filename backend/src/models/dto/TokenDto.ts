import { IsString, IsEnum, IsDate, IsBoolean, IsOptional } from 'class-validator';
import { TokenType } from '../enums';

export class TokenDto {
  @IsString()
  id: string;

  @IsString()
  userId: string;

  @IsEnum(TokenType)
  type: TokenType;

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

  @IsEnum(TokenType)
  type: TokenType;

  @IsString()
  email: string;

  @IsString({ each: true })
  roles: string[];

  @IsOptional()
  @IsString()
  refreshTokenId?: string;
}
