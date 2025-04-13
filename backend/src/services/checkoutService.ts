import { Injectable } from "@nestjs/common";
import { StripeClient } from "src/clients/StripeClient";
import { RedisClient } from "src/clients/RedisClient";
import { CreateUserDto } from "src/models/dto/CreateUserDto";

@Injectable()
export class CheckoutService {
  constructor(
    private readonly stripeClient: StripeClient,
    private readonly redisClient: RedisClient
  ) { }


  async createMembershipPaymentIntent(memberIdentity: CreateUserDto) {
    const { clientSecret, paymentIntentId } = await this.stripeClient.createMembershipPaymentIntent()

    const potentialSession = {
      email: memberIdentity.email,
      phone: memberIdentity.phone,
      firstName: memberIdentity.firstName,
      middleName: memberIdentity.middleName,
      lastName: memberIdentity.lastName,
    }

    // Save with hardcoded ID
    await this.redisClient.savePaymentIntent(paymentIntentId, potentialSession);

    return { clientSecret }
  }

  async handlePaymentIntentWebhookEvent(rawBody: Buffer, signature: string) {
    const event = this.stripeClient.constructWebhookEvent(rawBody, signature);

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntentId = event.data.object.id;
      await this.redisClient.setPaymentIntentAsSucceeded(paymentIntentId);
    }

    return { received: true };
  }
}
