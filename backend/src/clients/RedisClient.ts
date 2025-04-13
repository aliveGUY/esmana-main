import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { createClient, RedisClientType } from "redis";

@Injectable()
export class RedisClient implements OnModuleInit, OnModuleDestroy {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || '6379'),
      },
    });

    this.client.on('error', (err) => console.error('Redis Client Error', err));
  }

  async onModuleInit() {
    await this.client.connect();
    console.log('Redis client connected');
  }

  async onModuleDestroy() {
    await this.client.disconnect();
    console.log('Redis client disconnected');
  }

  async getSessionById(sessionId: string): Promise<any> {
    const session = await this.client.get(`session:${sessionId}`);
    return session ? JSON.parse(session) : null;
  }

  async saveSession(sessionId: string, data: any): Promise<void> {
    await this.client.set(`session:${sessionId}`, JSON.stringify(data));
  }

  async deleteSession(sessionId: string): Promise<void> {
    await this.client.del(`session:${sessionId}`);
  }

  async getPaymentAttemptById(paymentAttemptId: string): Promise<any> {
    const payment = await this.client.get(`payment:${paymentAttemptId}`);
    return payment ? JSON.parse(payment) : null;
  }

  async savePaymentAttempt(paymentAttemptId: string, data: any): Promise<void> {
    await this.client.set(`payment:${paymentAttemptId}`, JSON.stringify(data));
  }

  async deletePaymentAttempt(paymentAttemptId: string): Promise<void> {
    await this.client.del(`payment:${paymentAttemptId}`);
  }
}
