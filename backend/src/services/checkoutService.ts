import { Injectable } from "@nestjs/common";
import { StripeClient } from "src/clients/StripeClient";
import { RedisClient } from "src/clients/RedisClient";

@Injectable()
export class CheckoutService {
  constructor(
    private readonly stripeClient: StripeClient,
    private readonly redisClient: RedisClient
  ) { }

  getStripeApiVersion(): string {
    return this.stripeClient.getApiVersion();
  }


  async createMembershipPaymentIntent(memberIdentity) {
    const { clientSecret, paymentIntentId } = await this.stripeClient.createMembershipPaymentIntent()

    const potentialSession = {
      email: memberIdentity.email,
      phone: memberIdentity.phone,
      firstName: memberIdentity.firstName,
      middleName: memberIdentity.middleName,
      lastName: memberIdentity.lastName,
    }

    // Save with the actual payment intent ID
    await this.redisClient.savePaymentIntent(paymentIntentId, potentialSession);

    return { clientSecret, paymentIntentId }
  }

  async handlePaymentIntentWebhookEvent(rawBody: Buffer, signature: string) {
    console.log('=== PROCESSING WEBHOOK ===');
    console.log('Raw body type:', typeof rawBody);
    console.log('Raw body instanceof Buffer:', rawBody instanceof Buffer);
    console.log('Signature length:', signature?.length);
    
    // Log environment variables
    console.log('STRIPE_WEBHOOK_SECRET available:', !!process.env.STRIPE_WEBHOOK_SECRET);
    console.log('STRIPE_WEBHOOK_SECRET length:', process.env.STRIPE_WEBHOOK_SECRET?.length);
    
    try {
      // Log before constructing event
      console.log('Attempting to construct Stripe event...');
      const event = this.stripeClient.constructWebhookEvent(rawBody, signature);
      
      // Log successful event construction
      console.log('Event successfully constructed!');
      console.log('Event type:', event.type);
      console.log('Event ID:', event.id);
      console.log('Event created:', new Date(event.created * 1000).toISOString());
      
      // Safely access the object ID
      const objectId = event.data.object['id'];
      console.log('Event object ID:', objectId);
      
      if (event.type === 'payment_intent.succeeded') {
        const paymentIntentId = event.data.object['id'] as string;
        console.log('Payment intent succeeded:', paymentIntentId);
        
        // Check if payment intent exists in Redis
        const existingData = await this.redisClient.getPaymentIntentById(paymentIntentId);
        console.log('Payment intent in Redis:', existingData ? 'Found' : 'Not found');
        
        if (existingData) {
          console.log('Existing payment intent data:', existingData);
          await this.redisClient.setPaymentIntentAsSucceeded(paymentIntentId);
          console.log('Payment intent marked as succeeded');
        } else {
          console.log('Creating new payment intent record in Redis');
          const minimalData = { succeeded: true };
          await this.redisClient.savePaymentIntent(paymentIntentId, minimalData);
        }
      }
      
      return { received: true, eventId: event.id, type: event.type };
    } catch (error) {
      console.error('=== WEBHOOK ERROR ===');
      console.error('Error type:', error.constructor.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      
      // For Stripe errors, log additional details
      if (error.type) {
        console.error('Stripe error type:', error.type);
        console.error('Stripe error raw:', error.raw);
      }
      
      // Log the signature and payload for debugging
      console.error('Signature used:', signature);
      console.error('Raw body first 100 chars:', rawBody?.toString().substring(0, 100) + '...');
      
      return { 
        received: false, 
        error: error.message,
        errorType: error.constructor.name,
        stripeErrorType: error.type
      };
    }
  }
}
