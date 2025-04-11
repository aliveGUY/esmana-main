import { Injectable } from "@nestjs/common";
import Stripe from "stripe";
@Injectable()
export class StripeClient {
  private stripe: Stripe;
  private frontDomain: string = 'https://www.esmana-main.org'

  constructor() {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('Stripe key ot defined')
    }

    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-03-31.basil",
    });
  }

  async createCheckoutSession() {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      ui_mode: 'embedded',
      line_items: [
        {
          price_data: {
            currency: 'uah',
            product_data: {
              name: 'LEARNING',
            },
            unit_amount: 100 * 50
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      return_url: `${this.frontDomain}/dashboard/return?session_id={CHECKOUT_SESSION_ID}`,
      locale: 'en-GB'
    })

    return { clientSecret: session.client_secret }
  }

  async getSessionStatus(sessionId: string) {
    const session = await this.stripe.checkout.sessions.retrieve(sessionId)

    return {
      status: session.status,
      customerEmail: session.customer_details?.email
    }
  }
}