import { Injectable } from "@nestjs/common";
import { StripeClient } from "src/clients/StripeClient";
import { CreateMemberIdentityDto } from "src/models/dto/CreateMemberIdentityDto";
import Stripe from "stripe";

@Injectable()
export class CheckoutService {
  constructor(private readonly stripeClient: StripeClient) { }


  async createMembershipPaymentIntent(memberIdentity: CreateMemberIdentityDto) {
    return this.stripeClient.createMembershipPaymentIntent(memberIdentity)
  }

  async handlePaymentIntentWebhookEvent(rawBody: Buffer, signature: string) {
    const event = this.stripeClient.constructWebhookEvent(rawBody, signature)

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent: Stripe.PaymentIntent = event.data.object;
      const accountData = JSON.parse(paymentIntent.metadata.name)
      console.log({ accountData })
    }

    return { received: true }
  }
}