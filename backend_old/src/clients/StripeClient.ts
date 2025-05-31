import { Injectable } from "@nestjs/common";
import Stripe from "stripe";

@Injectable()
export class StripeClient {
  private stripe: Stripe;
  private readonly apiVersion = "2025-03-31.basil";

  constructor() {
    // if (!process.env.STRIPE_SECRET_KEY) {
    //   throw new Error('Stripe key ot defined')
    // }

    // this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    //   apiVersion: this.apiVersion,
    // });
  }

  getApiVersion(): string {
    return this.apiVersion;
  }

  async createMembershipPaymentIntent() {
    const paymentIntent: Stripe.Response<Stripe.PaymentIntent> = await this.stripe.paymentIntents.create({
      amount: 500 * 100,
      currency: 'uah',
    });

    return { clientSecret: paymentIntent.client_secret, paymentIntentId: paymentIntent.id }
  }

  constructWebhookEvent(rawBody: Buffer, signature: string): Stripe.Event {
    console.log('=== CONSTRUCTING WEBHOOK EVENT ===');
    
    // Check inputs
    if (!rawBody) {
      console.error('Raw body is missing or empty');
      throw new Error('Raw body is missing or empty');
    }
    
    if (!signature) {
      console.error('Signature is missing or empty');
      throw new Error('Signature is missing or empty');
    }
    
    // Get webhook secret from environment variable
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
      console.error('STRIPE_WEBHOOK_SECRET is not defined in environment variables');
      throw new Error('Stripe webhook secret is not defined');
    }
    
    console.log('Webhook secret available:', !!webhookSecret);
    console.log('Webhook secret length:', webhookSecret.length);
    console.log('Using webhook secret (first 10 chars):', webhookSecret.substring(0, 10) + '...');
    
    try {
      const event = this.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        webhookSecret,
      );
      
      console.log('Event successfully constructed');
      return event;
    } catch (error) {
      console.error('Error constructing webhook event:', error.message);
      throw error;
    }
  }
}
