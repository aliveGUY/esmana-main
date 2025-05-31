import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { IRedisService } from './interfaces/redis.interface';

@Injectable()
export class RedisService implements IRedisService, OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private client: Redis;
  private isConnected = false;

  constructor(private readonly configService: ConfigService) {}

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
      this.isConnected = true;
    });

    this.client.on('ready', () => {
      this.logger.log('✅ Redis client ready');
      this.isConnected = true;
    });

    this.client.on('error', (error) => {
      this.logger.warn('⚠️ Redis connection error (continuing without Redis):', error.message);
      this.isConnected = false;
    });

    this.client.on('close', () => {
      this.logger.warn('⚠️ Redis connection closed (continuing without Redis)');
      this.isConnected = false;
    });

    try {
      await this.client.connect();
      await this.ping();
      this.isConnected = true;
    } catch (error) {
      this.logger.warn('⚠️ Failed to connect to Redis, continuing without Redis:', error.message);
      this.isConnected = false;
      // Don't throw error - continue without Redis
    }
  }

  async onModuleDestroy() {
    if (this.client && this.isConnected) {
      await this.client.quit();
      this.logger.log('Redis connection closed');
    }
  }

  async get(key: string): Promise<string | null> {
    if (!this.isConnected) {
      this.logger.debug(`🔄 [Redis Fallback] Would GET key: ${key}`);
      return null;
    }

    try {
      return await this.client.get(key);
    } catch (error) {
      this.logger.warn(`Error getting key ${key}:`, error.message);
      return null;
    }
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    if (!this.isConnected) {
      this.logger.debug(`🔄 [Redis Fallback] Would SET key: ${key} (TTL: ${ttl}s)`);
      return;
    }

    try {
      if (ttl) {
        await this.client.setex(key, ttl, value);
      } else {
        await this.client.set(key, value);
      }
    } catch (error) {
      this.logger.warn(`Error setting key ${key}:`, error.message);
    }
  }

  async del(key: string): Promise<void> {
    if (!this.isConnected) {
      this.logger.debug(`🔄 [Redis Fallback] Would DELETE key: ${key}`);
      return;
    }

    try {
      await this.client.del(key);
    } catch (error) {
      this.logger.warn(`Error deleting key ${key}:`, error.message);
    }
  }

  async exists(key: string): Promise<boolean> {
    if (!this.isConnected) {
      this.logger.debug(`🔄 [Redis Fallback] Would CHECK EXISTS key: ${key} (returning false)`);
      return false;
    }

    try {
      const result = await this.client.exists(key);
      return result === 1;
    } catch (error) {
      this.logger.warn(`Error checking existence of key ${key}:`, error.message);
      return false;
    }
  }

  async expire(key: string, ttl: number): Promise<void> {
    if (!this.isConnected) {
      this.logger.debug(`🔄 [Redis Fallback] Would SET EXPIRE key: ${key} (TTL: ${ttl}s)`);
      return;
    }

    try {
      await this.client.expire(key, ttl);
    } catch (error) {
      this.logger.warn(`Error setting expiration for key ${key}:`, error.message);
    }
  }

  async hget(key: string, field: string): Promise<string | null> {
    if (!this.isConnected) {
      this.logger.debug(`🔄 [Redis Fallback] Would HGET key: ${key}, field: ${field}`);
      return null;
    }

    try {
      return await this.client.hget(key, field);
    } catch (error) {
      this.logger.warn(`Error getting hash field ${field} from key ${key}:`, error.message);
      return null;
    }
  }

  async hset(key: string, field: string, value: string): Promise<void> {
    if (!this.isConnected) {
      this.logger.debug(`🔄 [Redis Fallback] Would HSET key: ${key}, field: ${field}`);
      return;
    }

    try {
      await this.client.hset(key, field, value);
    } catch (error) {
      this.logger.warn(`Error setting hash field ${field} in key ${key}:`, error.message);
    }
  }

  async hgetall(key: string): Promise<Record<string, string>> {
    if (!this.isConnected) {
      this.logger.debug(`🔄 [Redis Fallback] Would HGETALL key: ${key} (returning empty object)`);
      return {};
    }

    try {
      return await this.client.hgetall(key);
    } catch (error) {
      this.logger.warn(`Error getting all hash fields from key ${key}:`, error.message);
      return {};
    }
  }

  async hdel(key: string, field: string): Promise<void> {
    if (!this.isConnected) {
      this.logger.debug(`🔄 [Redis Fallback] Would HDEL key: ${key}, field: ${field}`);
      return;
    }

    try {
      await this.client.hdel(key, field);
    } catch (error) {
      this.logger.warn(`Error deleting hash field ${field} from key ${key}:`, error.message);
    }
  }

  async keys(pattern: string): Promise<string[]> {
    if (!this.isConnected) {
      this.logger.debug(`🔄 [Redis Fallback] Would GET KEYS pattern: ${pattern} (returning empty array)`);
      return [];
    }

    try {
      return await this.client.keys(pattern);
    } catch (error) {
      this.logger.warn(`Error getting keys with pattern ${pattern}:`, error.message);
      return [];
    }
  }

  async flushdb(): Promise<void> {
    if (!this.isConnected) {
      this.logger.debug(`🔄 [Redis Fallback] Would FLUSHDB`);
      return;
    }

    try {
      await this.client.flushdb();
    } catch (error) {
      this.logger.warn('Error flushing database:', error.message);
    }
  }

  async ping(): Promise<string> {
    if (!this.isConnected) {
      this.logger.debug(`🔄 [Redis Fallback] Would PING (returning 'PONG')`);
      return 'PONG';
    }

    try {
      return await this.client.ping();
    } catch (error) {
      this.logger.warn('Error pinging Redis:', error.message);
      return 'ERROR';
    }
  }

  getClient(): Redis {
    return this.client;
  }

  isRedisConnected(): boolean {
    return this.isConnected;
  }
}
