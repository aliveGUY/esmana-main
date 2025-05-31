import { Module } from '@nestjs/common';
import { StripeClient } from 'src/clients/StripeClient';
import { CheckoutController } from 'src/controllers/checkoutController';
import { PaymentLoginGuard } from 'src/guards/PaymentLoginGuard';
import { CheckoutService } from 'src/services/checkoutService';
import { RedisModule } from './redisModule';

@Module({
  imports: [RedisModule],
  controllers: [CheckoutController],
  providers: [CheckoutService, StripeClient, PaymentLoginGuard],
  exports: [CheckoutService],
})
export class CheckoutModule { }
