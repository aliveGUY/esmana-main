import { Injectable } from "@nestjs/common";
import { StripeClient } from "src/clients/StripeClient";
import { CreateMemberIdentityDto } from "src/models/dto/CreateMemberIdentityDto";
import Stripe from "stripe";
import { Response } from "express";
import { RedisClient } from "src/clients/RedisClient";
import { isEmpty } from "lodash";

@Injectable()
export class CheckoutService {
  constructor(
    private readonly stripeClient: StripeClient,
    private readonly redisClient: RedisClient
  ) { }


  async createMembershipPaymentIntent(memberIdentity: CreateMemberIdentityDto) {
    return this.stripeClient.createMembershipPaymentIntent(memberIdentity)
  }

  async handlePaymentIntentWebhookEvent(rawBody: Buffer, signature: string, req: any) {
    const event = this.stripeClient.constructWebhookEvent(rawBody, signature)

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent: Stripe.PaymentIntent = event.data.object;
      
      try {
        // Extract account data from metadata
        const memberIdentity = JSON.parse(paymentIntent.metadata.name) as CreateMemberIdentityDto;
        const user = memberIdentity.user;
        
        // Save user data to Redis - this will be used directly for login
        await this.redisClient.savePaymentAttempt(paymentIntent.id, user);
        console.log(`Saved user data for payment ${paymentIntent.id}`);
      } catch (error) {
        console.error('Error processing payment webhook:', error);
        // Still save basic success info if parsing fails
        await this.redisClient.savePaymentAttempt(paymentIntent.id, { 
          success: true,
          error: 'Failed to parse metadata'
        });
      }
    }

    return { received: true }
  }

  // The checkPaymentStatus method is removed as it's now handled by the PaymentLoginGuard
}
