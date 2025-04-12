import { Module } from '@nestjs/common';
import { StripeClient } from 'src/clients/StripeClient';
import { CheckoutController } from 'src/controllers/checkoutController';
import { CheckoutService } from 'src/services/checkoutService';

@Module({
  imports: [],
  controllers: [CheckoutController],
  providers: [CheckoutService, StripeClient],
  exports: [CheckoutService],
})
export class CheckoutModule { }