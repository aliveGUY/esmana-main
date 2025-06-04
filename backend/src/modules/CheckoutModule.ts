import { Module } from '@nestjs/common';
import { WayForPayClient } from 'src/infrastructure/WayForPayClient';
import { CheckoutController } from 'src/controllers/CheckoutController';
import { CheckoutService } from 'src/services/CheckoutService';
import { RedisModule } from './RedisModule';

@Module({
  imports: [RedisModule],
  controllers: [CheckoutController],
  providers: [
    {
      provide: 'IWayForPayClient',
      useClass: WayForPayClient,
    },
    {
      provide: 'ICheckoutService',
      useClass: CheckoutService,
    },
  ],
  exports: [
    'IWayForPayClient',
    'ICheckoutService'
  ],
})
export class CheckoutModule { }
