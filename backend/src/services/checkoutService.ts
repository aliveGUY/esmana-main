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
    console.log('webhook service')
    const event = this.stripeClient.constructWebhookEvent(rawBody, signature)

    console.log({ event })
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent: Stripe.PaymentIntent = event.data.object;
      const accountData = JSON.parse(paymentIntent.metadata.name)
      console.log('SHOULD CREATE ACCOUNT', { accountData })
    }

    return { received: true }
  }
}