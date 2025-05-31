import { Injectable, Inject } from '@nestjs/common';
import { TokenData } from '../models/token.model';
import { TokenType } from '../models/enums';
import { ITokenRepository } from '../repositories/token.repository';

export interface ITokenService {
  generateAccessToken(userId: string, metadata?: any): Promise<string>;
  generateRefreshToken(userId: string, metadata?: any): Promise<string>;
  validateToken(token: string): Promise<TokenData | null>;
  getTokenData(token: string): Promise<TokenData | null>;
  revokeToken(token: string): Promise<void>;
  revokeUserTokens(userId: string, type?: TokenType): Promise<void>;
  isTokenBlacklisted(token: string): Promise<boolean>;
  blacklistToken(token: string): Promise<void>;
  getTokenExpirationTime(type: TokenType): number;
}

@Injectable()
export class TokenService implements ITokenService {
  constructor(
    @Inject('ITokenRepository') private readonly tokenRepository: ITokenRepository,
  ) {}

  async generateAccessToken(userId: string, metadata?: any): Promise<string> {
    return this.tokenRepository.generateAccessToken(userId, metadata);
  }

  async generateRefreshToken(userId: string, metadata?: any): Promise<string> {
    return this.tokenRepository.generateRefreshToken(userId, metadata);
  }

  async validateToken(token: string): Promise<TokenData | null> {
    return this.tokenRepository.validateToken(token);
  }

  async getTokenData(token: string): Promise<TokenData | null> {
    return this.tokenRepository.getTokenData(token);
  }

  async revokeToken(token: string): Promise<void> {
    return this.tokenRepository.revokeToken(token);
  }

  async revokeUserTokens(userId: string, type?: TokenType): Promise<void> {
    return this.tokenRepository.revokeUserTokens(userId, type);
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    return this.tokenRepository.isTokenBlacklisted(token);
  }

  async blacklistToken(token: string): Promise<void> {
    return this.tokenRepository.blacklistToken(token);
  }

  getTokenExpirationTime(type: TokenType): number {
    return this.tokenRepository.getTokenExpirationTime(type);
  }
}
