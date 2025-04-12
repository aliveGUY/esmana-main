import { Injectable } from "@nestjs/common";
import { StripeClient } from "src/clients/StripeClient";
import { CreateMemberIdentityDto } from "src/models/dto/CreateMemberIdentityDto";
import Stripe from "stripe";
import { Response } from "express";

// Declare the global variable to store successful payments
declare global {
  var successfulPayments: Record<string, any>;
}

// Initialize the global variable if it doesn't exist
global.successfulPayments = global.successfulPayments || {};

@Injectable()
export class CheckoutService {
  constructor(private readonly stripeClient: StripeClient) { }


  async createMembershipPaymentIntent(memberIdentity: CreateMemberIdentityDto) {
    return this.stripeClient.createMembershipPaymentIntent(memberIdentity)
  }

  async handlePaymentIntentWebhookEvent(rawBody: Buffer, signature: string, req: any) {
    const event = this.stripeClient.constructWebhookEvent(rawBody, signature)

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent: Stripe.PaymentIntent = event.data.object;
      const accountData = JSON.parse(paymentIntent.metadata.name);

      // Store the payment intent ID in the global variable
      global.successfulPayments[paymentIntent.id] = {
        email: accountData.email,
        timestamp: new Date()
      };

      console.log({ saveAttempt: global.successfulPayments, paymentIntentId: paymentIntent.id })
    }

    return { received: true }
  }

  async checkPaymentStatus(paymentIntentId: string, req: any, res: Response) {
    // Check if we have a successful payment for this payment intent ID
    console.log({ getAttempt: global.successfulPayments, paymentIntentId })

    if (!global.successfulPayments[paymentIntentId]) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found or not yet processed'
      });
    }

    // Get the payment data
    const paymentData = global.successfulPayments[paymentIntentId];

    // Remove the payment intent ID from the global variable
    delete global.successfulPayments[paymentIntentId];

    // Create a user object with the payment data
    // This is a temporary user just for the session
    const tempUser = {
      id: Date.now(), // Generate a temporary ID
      email: paymentData.email,
      role: 'TEMP_USER'
    };

    // Log the user in
    req.login(tempUser, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Failed to create session'
        });
      }

      console.log("Sending redirect")

      return res.status(200).json({
        success: true,
        message: 'Session created successfully',
        redirectUrl: '/dashboard'
      });
    });
  }
}
