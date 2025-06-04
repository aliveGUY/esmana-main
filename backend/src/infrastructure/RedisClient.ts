import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Redis from "ioredis";

export interface IRedisClient {
  saveKey(key: string, value: string, ttl: number): Promise<void>
  getKey(key: string): Promise<string | null>
  deleteKey(key: string): Promise<void>
  isKeyExists(key: string): Promise<boolean>
  findKeys(pattern: string): Promise<string[]>
}

@Injectable()
export class RedisClient implements IRedisClient, OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisClient.name);
  private client: Redis;

  constructor(private readonly configService: ConfigService) { }

  async onModuleInit() {
    const redisConfig = this.configService.get('redis');

    this.client = new Redis({
      username: redisConfig.username,
      password: redisConfig.password,
      host: redisConfig.socket.host,
      port: redisConfig.socket.port,
      db: redisConfig.database,
      enableReadyCheck: redisConfig.enableReadyCheck,
      maxRetriesPerRequest: redisConfig.maxRetriesPerRequest,
      lazyConnect: redisConfig.lazyConnect,
      keepAlive: redisConfig.keepAlive,
      family: redisConfig.family,
      keyPrefix: redisConfig.keyPrefix,
    });

    this.client.on('connect', () => {
      this.logger.log('✅ Connected to Redis');
    });

    this.client.on('ready', () => {
      this.logger.log('✅ Redis client ready');
    });

    this.client.on('error', (error) => {
      this.logger.warn('⚠️ Redis connection error (continuing without Redis):', error.message);
    });

    this.client.on('close', () => {
      this.logger.warn('⚠️ Redis connection closed (continuing without Redis)');
    });

    try {
      await this.client.connect();
      await this.ping();
    } catch (error) {
      this.logger.warn('⚠️ Failed to connect to Redis, continuing without Redis:', error.message);
      // Don't throw error - continue without Redis
    }
  }

  async onModuleDestroy() {
    if (this.client) {
      await this.client.quit();
      this.logger.log('Redis connection closed');
    }
  }

  private async ping(): Promise<string> {
    try {
      return await this.client.ping();
    } catch (error) {
      this.logger.warn('Error pinging Redis:', error.message);
      return 'ERROR';
    }
  }

  async saveKey(key: string, value: string, ttl: number): Promise<void> {
    if (ttl) {
      await this.client.setex(key, ttl, value);
    } else {
      await this.client.set(key, value);
    }
  }

  async getKey(key: string): Promise<string | null> {
    try {
      return await this.client.get(key)
    } catch {
      return null
    }
  }

  async deleteKey(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch { }
  }

  async isKeyExists(key: string): Promise<boolean> {
    const result = await this.client.exists(key);
    return result === 1;
  }

  async findKeys(pattern: string): Promise<string[]> {
    try {
      return await this.client.keys(pattern);
    } catch (error) {
      this.logger.warn(`Error getting keys with pattern ${pattern}:`, error.message);
      return [];
    }
  }
}