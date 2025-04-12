import { Injectable } from "@nestjs/common";
import { CreateMemberIdentityDto } from "src/models/dto/CreateMemberIdentityDto";
import Stripe from "stripe";

@Injectable()
export class StripeClient {
  private stripe: Stripe;

  constructor() {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('Stripe key ot defined')
    }

    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-03-31.basil",
    });
  }

  async createMembershipPaymentIntent(memberIdentity: CreateMemberIdentityDto) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: 500 * 100,
      currency: 'uah',
      metadata: { name: JSON.stringify(memberIdentity) },
    });

    return { clientSecret: paymentIntent.client_secret }
  }

  constructWebhookEvent(rawBody: Buffer, signature: string): Stripe.Event {
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!endpointSecret) throw new Error('No secret found')

    return this.stripe.webhooks.constructEvent(
      rawBody,
      signature,
      endpointSecret,
    );
  }
}
