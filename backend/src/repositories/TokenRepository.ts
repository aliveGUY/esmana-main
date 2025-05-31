import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokenData } from '../models/Token';
import { TokenType } from '../models/enums';
import { IRedisService } from '../infrastructure/redis/interfaces/redis.interface';
import * as crypto from 'crypto';

export interface ITokenRepository {
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
export class TokenRepository implements ITokenRepository {
  private readonly TOKEN_PREFIX = 'token';
  private readonly USER_TOKENS_PREFIX = 'user_tokens';
  private readonly BLACKLIST_PREFIX = 'token_blacklist';

  constructor(
    private readonly configService: ConfigService,
    @Inject('IRedisService') private readonly redisService: IRedisService,
  ) {}

  async generateAccessToken(userId: string, metadata: any = {}): Promise<string> {
    const token = this.generateSecureToken();
    const expirationTime = this.getTokenExpirationTime(TokenType.ACCESS);
    const expiresAt = new Date(Date.now() + expirationTime * 1000);

    const tokenData: TokenData = {
      userId,
      type: TokenType.ACCESS,
      email: metadata.email || '',
      roles: metadata.roles || [],
      createdAt: new Date(),
      expiresAt,
      isRevoked: false,
      refreshTokenId: metadata.refreshTokenId,
      metadata,
    };

    // Store token data in Redis with TTL
    await this.redisService.set(
      `${this.TOKEN_PREFIX}:${token}`,
      JSON.stringify(tokenData),
      expirationTime,
    );

    // Add to user's token set
    await this.redisService.set(
      `${this.USER_TOKENS_PREFIX}:${userId}:${TokenType.ACCESS}:${token}`,
      token,
      expirationTime,
    );

    return token;
  }

  async generateRefreshToken(userId: string, metadata: any = {}): Promise<string> {
    const token = this.generateSecureToken();
    const expirationTime = this.getTokenExpirationTime(TokenType.REFRESH);
    const expiresAt = new Date(Date.now() + expirationTime * 1000);

    const tokenData: TokenData = {
      userId,
      type: TokenType.REFRESH,
      email: metadata.email || '',
      roles: metadata.roles || [],
      createdAt: new Date(),
      expiresAt,
      isRevoked: false,
      metadata,
    };

    // Store token data in Redis with TTL
    await this.redisService.set(
      `${this.TOKEN_PREFIX}:${token}`,
      JSON.stringify(tokenData),
      expirationTime,
    );

    // Add to user's token set
    await this.redisService.set(
      `${this.USER_TOKENS_PREFIX}:${userId}:${TokenType.REFRESH}:${token}`,
      token,
      expirationTime,
    );

    return token;
  }

  async validateToken(token: string): Promise<TokenData | null> {
    // Check if token is blacklisted
    if (await this.isTokenBlacklisted(token)) {
      return null;
    }

    const tokenData = await this.getTokenData(token);
    
    if (!tokenData) {
      return null;
    }

    // Check if token is expired
    if (new Date() > tokenData.expiresAt) {
      await this.revokeToken(token);
      return null;
    }

    // Check if token is revoked
    if (tokenData.isRevoked) {
      return null;
    }

    return tokenData;
  }

  async getTokenData(token: string): Promise<TokenData | null> {
    try {
      const data = await this.redisService.get(`${this.TOKEN_PREFIX}:${token}`);
      
      if (!data) {
        return null;
      }

      const tokenData = JSON.parse(data);
      return {
        ...tokenData,
        createdAt: new Date(tokenData.createdAt),
        expiresAt: new Date(tokenData.expiresAt),
      };
    } catch (error) {
      return null;
    }
  }

  async revokeToken(token: string): Promise<void> {
    const tokenData = await this.getTokenData(token);
    
    if (!tokenData) {
      return;
    }

    // Mark token as revoked
    const updatedTokenData = {
      ...tokenData,
      isRevoked: true,
    };

    const remainingTtl = Math.max(0, Math.floor((tokenData.expiresAt.getTime() - Date.now()) / 1000));
    
    if (remainingTtl > 0) {
      await this.redisService.set(
        `${this.TOKEN_PREFIX}:${token}`,
        JSON.stringify(updatedTokenData),
        remainingTtl,
      );
    }

    // Remove from user's token set
    await this.redisService.del(`${this.USER_TOKENS_PREFIX}:${tokenData.userId}:${tokenData.type}:${token}`);
  }

  async revokeUserTokens(userId: string, type?: TokenType): Promise<void> {
    const pattern = type 
      ? `${this.USER_TOKENS_PREFIX}:${userId}:${type}:*`
      : `${this.USER_TOKENS_PREFIX}:${userId}:*`;

    const tokenKeys = await this.redisService.keys(pattern);
    
    for (const key of tokenKeys) {
      const token = await this.redisService.get(key);
      if (token) {
        await this.revokeToken(token);
      }
    }
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    return this.redisService.exists(`${this.BLACKLIST_PREFIX}:${token}`);
  }

  async blacklistToken(token: string): Promise<void> {
    const tokenData = await this.getTokenData(token);
    
    if (tokenData) {
      const remainingTtl = Math.max(0, Math.floor((tokenData.expiresAt.getTime() - Date.now()) / 1000));
      
      if (remainingTtl > 0) {
        await this.redisService.set(
          `${this.BLACKLIST_PREFIX}:${token}`,
          'blacklisted',
          remainingTtl,
        );
      }
    } else {
      // If we can't get token data, blacklist for a default period
      await this.redisService.set(
        `${this.BLACKLIST_PREFIX}:${token}`,
        'blacklisted',
        24 * 60 * 60, // 24 hours
      );
    }

    // Also revoke the token
    await this.revokeToken(token);
  }

  getTokenExpirationTime(type: TokenType): number {
    const config = this.configService.get('token') || {};
    
    switch (type) {
      case TokenType.ACCESS:
        return this.parseExpirationTime(config.accessTokenExpiresIn || '15m');
      case TokenType.REFRESH:
        return this.parseExpirationTime(config.refreshTokenExpiresIn || '7d');
      default:
        return 900; // 15 minutes default
    }
  }

  private generateSecureToken(): string {
    // Generate a cryptographically secure random token
    return crypto.randomBytes(32).toString('hex');
  }

  private parseExpirationTime(expiresIn: string): number {
    const unit = expiresIn.slice(-1);
    const value = parseInt(expiresIn.slice(0, -1));

    switch (unit) {
      case 's':
        return value;
      case 'm':
        return value * 60;
      case 'h':
        return value * 60 * 60;
      case 'd':
        return value * 24 * 60 * 60;
      default:
        return 900; // 15 minutes default
    }
  }
}
