import { Body, Controller, Get, Headers, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateMemberIdentityDto } from 'src/models/dto/CreateMemberIdentityDto';
import { CheckoutService } from 'src/services/checkoutService';
import { PaymentLoginGuard } from 'src/guards/PaymentLoginGuard';

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
    @Req() req: Request & { rawBody: Buffer, session: any },
    @Headers('stripe-signature') signature: string,
  ) {
    return this.checkoutService.handlePaymentIntentWebhookEvent(req.rawBody, signature, req)
  }
  
  @Get('check-registration-status')
  @UseGuards(PaymentLoginGuard)
  checkRegistrationStatus() {
    // The guard handles everything - no implementation needed here
    // The response is set by the guard
  }
}
