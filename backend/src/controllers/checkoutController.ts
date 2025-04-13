import { Body, Controller, Get, Headers, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { CheckoutService } from 'src/services/checkoutService';
import { PaymentLoginGuard } from 'src/guards/PaymentLoginGuard';
import { CreateUserDto } from 'src/models/dto/CreateUserDto';

@Controller('/')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) { }

  @Post('create-membership-payment-intent')
  async createCheckoutSession(@Body() memberIdentity: CreateUserDto) {
    return this.checkoutService.createMembershipPaymentIntent(memberIdentity)
  }

  @Post('payment-intent-webhook')
  @HttpCode(200)
  async handleWebhook(
    @Req() req: Request & { rawBody: Buffer, session: any },
    @Headers('stripe-signature') signature: string,
  ) {
    console.log('=== WEBHOOK REQUEST RECEIVED ===');
    console.log('Headers:', JSON.stringify(req.headers));
    console.log('Stripe-Signature:', signature);
    // With bodyParser.raw, the raw body is in req.body as a Buffer
    const rawBody = req.body;
    console.log('Raw body available:', !!rawBody);
    console.log('Raw body type:', typeof rawBody);
    console.log('Raw body instanceof Buffer:', rawBody instanceof Buffer);
    console.log('Raw body length:', rawBody?.length);
    if (rawBody) {
      console.log('Raw body (first 100 chars):', rawBody.toString().substring(0, 100) + '...');
    }
    
    try {
      const result = await this.checkoutService.handlePaymentIntentWebhookEvent(rawBody, signature);
      console.log('Webhook processing result:', result);
      return result;
    } catch (error) {
      console.error('Controller error handling webhook:', error);
      return { received: false, error: error.message };
    }
  }

  @Get('check-registration-status')
  @UseGuards(PaymentLoginGuard)
  checkRegistrationStatus() {
    // The guard handles everything - no implementation needed here
    // The response is set by the guard
  }
}
