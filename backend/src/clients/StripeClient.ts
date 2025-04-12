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

  async createCheckoutSession({ email, username }) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: 1000, // Example amount in cents
      currency: 'usd',
      metadata: { email, username },
    });


    console.log({ email, username })

    return { clientSecret: paymentIntent.client_secret }
  }

  async handleWebHook({ req, res, signature }) {
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event: Stripe.Event;

    console.log({ endpointSecret })


    console.log('Called webhook')
    if (!endpointSecret) throw new Error('No secret')


    try {
      event = this.stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        endpointSecret,
      );
    } catch (err) {
      console.error(`Webhook signature verification failed.`, err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log({ event })
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('SHOULD CREATE ACCOUNT')
        // TODO: Implement your business logic for successful payment
        break;
      // Handle other event types as needed
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  }

  async getSessionStatus(sessionId: string) {
    const session = await this.stripe.checkout.sessions.retrieve(sessionId)

    return {
      status: session.status,
      customerEmail: session.customer_details?.email
    }
  }
}