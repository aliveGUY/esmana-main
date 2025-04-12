import { Body, Controller, Headers, HttpCode, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
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
    @Req() req: Request & { rawBody: Buffer, session: any },
    @Headers('stripe-signature') signature: string,
  ) {
    return this.checkoutService.handlePaymentIntentWebhookEvent(req.rawBody, signature, req)
  }
  
  @Post('check-payment-status')
  async checkPaymentStatus(
    @Body() body: { paymentIntentId: string },
    @Req() req: any,
    @Res() res: Response
  ) {
    return this.checkoutService.checkPaymentStatus(body.paymentIntentId, req, res);
  }
}
