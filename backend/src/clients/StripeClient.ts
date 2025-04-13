import { Injectable } from "@nestjs/common";
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

  async createMembershipPaymentIntent() {
    const paymentIntent: Stripe.Response<Stripe.PaymentIntent> = await this.stripe.paymentIntents.create({
      amount: 500 * 100,
      currency: 'uah',
    });

    return { clientSecret: paymentIntent.client_secret, paymentIntentId: paymentIntent.id }
  }

  constructWebhookEvent(rawBody: Buffer, signature: string): Stripe.Event {
    // const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    const endpointSecret = 'whsec_9aef58a731ce077eff0103f755b9fdf3910f74ab9d6856be24d309c03d51aae0'

    if (!endpointSecret) throw new Error('No secret found')

    return this.stripe.webhooks.constructEvent(
      rawBody,
      signature,
      endpointSecret,
    );
  }
}
