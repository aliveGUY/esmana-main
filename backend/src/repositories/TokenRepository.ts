import { Injectable, Inject } from '@nestjs/common';
import { AccessTokenData, RefreshTokenData } from '../models/Token';
import * as crypto from 'crypto';
import { IRedisClient } from 'src/infrastructure/RedisClient';

export interface ITokenRepository {
  generateAccessToken(user: AccessTokenData): Promise<string>
  generateRefreshToken(accessToken: string): Promise<void>
  isAccessTokenExpired(accessToken: string): Promise<boolean>
  getRefreshToken(accessToken: string): Promise<string | null>
  getAccessTokenData(accessToken: string): Promise<AccessTokenData>
  refreshAccessToken(refreshToken: string): Promise<RefreshTokenData>
  deleteAccessAndRefreshTokens(accessToken: string): Promise<void>
}

const FIFTEEN_MINUTES = 15 * 60 * 1000
export const ONE_DAY = 24 * 60 * 60 * 1000

@Injectable()
export class TokenRepository implements ITokenRepository {
  constructor(
    @Inject('IRedisClient') private readonly redisClient: IRedisClient,
  ) { }

  async generateAccessToken(user: AccessTokenData): Promise<string> {
    const token = this.generateSecureToken()
    const tokenData: AccessTokenData = {
      userId: user.userId,
      email: user.email,
      roles: user.roles,
    }

    await this.redisClient.saveKey(`access:${token}`, JSON.stringify(tokenData), FIFTEEN_MINUTES)
    return token
  }

  async generateRefreshToken(accessToken: string): Promise<void> {
    const token = this.generateSecureToken()
    const data = await this.getAccessTokenData(accessToken)
    const refreshData: RefreshTokenData = {
      userId: data.userId,
      email: data.email,
      roles: data.roles,
      accessToken: accessToken
    }

    await this.redisClient.saveKey(`refresh:${token}`, JSON.stringify(refreshData), ONE_DAY)
  }

  async isAccessTokenExpired(accessToken: string): Promise<boolean> {
    const token = await this.redisClient.getKey(`access:${accessToken}`)
    return token === null
  }

  async getRefreshToken(accessToken: string): Promise<string | null> {
    const refreshToken = await this.redisClient.findKeyByValue(accessToken)
    return refreshToken?.replace('refresh:', '') || null
  }

  async getAccessTokenData(accessToken: string): Promise<AccessTokenData> {
    const token = await this.redisClient.getKey(`access:${accessToken}`)
    if (!token) throw new Error('Token not found')
    const data: AccessTokenData = JSON.parse(token)

    return data
  }

  private async getRefreshTokenData(refreshToken: string): Promise<RefreshTokenData> {
    const token = await this.redisClient.getKey(`refresh:${refreshToken}`)
    if (!token) throw new Error('Token not found')
    const data: RefreshTokenData = JSON.parse(token)

    return data
  }

  async refreshAccessToken(refreshToken: string): Promise<RefreshTokenData> {
    const data = await this.getRefreshTokenData(refreshToken)

    const accessTokenData: AccessTokenData = {
      userId: data.userId,
      email: data.email,
      roles: data.roles
    }

    const accessToken = await this.generateAccessToken(accessTokenData)

    data.accessToken = accessToken

    await this.redisClient.editKey(`refresh:${refreshToken}`, JSON.stringify(data))

    return data
  }

  async deleteAccessAndRefreshTokens(accessToken: string): Promise<void> {
    const refreshToken = await this.getRefreshToken(accessToken)

    if (refreshToken) await this.redisClient.deleteKey(refreshToken)
    await this.redisClient.deleteKey(`access:${accessToken}`)
  }

  private generateSecureToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }
}
