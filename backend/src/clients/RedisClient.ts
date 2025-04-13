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

  }

  async onModuleInit() {
    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.disconnect();
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

  async getPaymentIntentById(PaymentIntentId: string): Promise<any> {
    const key = `payment:${PaymentIntentId}`;
    const payment = await this.client.get(key);
    return payment ? JSON.parse(payment) : null;
  }

  async savePaymentIntent(PaymentIntentId: string, data: any): Promise<void> {
    // Check if the payment intent already exists
    const existingData = await this.getPaymentIntentById(PaymentIntentId);

    // If it exists and is already succeeded, don't change the succeeded status
    if (existingData && existingData.succeeded === true) {
      data.succeeded = true;
    } else {
      // Otherwise, set it to false
      data.succeeded = false;
    }


    // Set the key
    const key = `payment:${PaymentIntentId}`;
    await this.client.set(key, JSON.stringify(data));
  }

  async getAllKeys(): Promise<string[]> {
    return await this.client.keys('*');
  }

  async deletePaymentIntent(PaymentIntentId: string): Promise<void> {
    await this.client.del(`payment:${PaymentIntentId}`);
  }

  async setPaymentIntentAsSucceeded(PaymentIntentId: string): Promise<void> {

    // Check if the key exists
    const key = `payment:${PaymentIntentId}`;

    const payment = await this.client.get(key);

    const data = payment ? JSON.parse(payment) : null;

    if (!data) {
      throw new Error(`Cannot find payment intent by id ${PaymentIntentId}`);
    }

    // Set succeeded to true
    data.succeeded = true;

    await this.client.set(key, JSON.stringify(data));
  }
}
