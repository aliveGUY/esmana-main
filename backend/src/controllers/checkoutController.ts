import { Body, Controller, Headers, HttpCode, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateMemberIdentityDto } from 'src/models/dto/CreateMemberIdentityDto';
import { CheckoutService } from 'src/services/checkoutService';

@Controller('/')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) { }

  @Post('create-membership-payment-intent')
  async createCheckoutSession(@Body() memberIdentity: CreateMemberIdentityDto) {
    return this.checkoutService.createMembershipPaymentIntent(memberIdentity)
  }

  @Post('payment-intent-webhook')
  @HttpCode(200)
  async handleWebhook(
    @Req() req: Request & { rawBody: Buffer },
    @Headers('stripe-signature') signature: string,
  ) {
    console.log('webhook controller')
    return this.checkoutService.handlePaymentIntentWebhookEvent(req.rawBody, signature)
  }
}