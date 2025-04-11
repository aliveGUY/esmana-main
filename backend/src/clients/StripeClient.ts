import Stripe from "stripe";

export class StripeClient {
  private stripe: Stripe;
  private frontDomain: string = 'http://localhost:3000'

  constructor() {
    if (!process.env.STRIPE_SECRET_KEY)
      throw new Error('Unable to initialize stripe')

    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-02-24.acacia",
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