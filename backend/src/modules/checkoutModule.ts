import { Module } from '@nestjs/common';
import { StripeClient } from 'src/clients/StripeClient';
import { RedisClient } from 'src/clients/RedisClient';
import { CheckoutController } from 'src/controllers/checkoutController';
import { PaymentLoginGuard } from 'src/guards/PaymentLoginGuard';
import { CheckoutService } from 'src/services/checkoutService';

@Module({
  imports: [],
  controllers: [CheckoutController],
  providers: [CheckoutService, StripeClient, RedisClient, PaymentLoginGuard],
  exports: [CheckoutService],
})
export class CheckoutModule { }
