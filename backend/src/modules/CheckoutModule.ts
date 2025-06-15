import { Module } from '@nestjs/common';
import { WayForPayClient } from 'src/infrastructure/WayForPayClient';
import { CheckoutController } from 'src/controllers/CheckoutController';
import { CheckoutService } from 'src/services/CheckoutService';
import { RedisModule } from './RedisModule';
import { UserModule } from './UserModule';
import { AuthModule } from './AuthModule';
import { CourseModule } from './CourseModule';
import { GoogleModule } from './GoogleModule';

@Module({
  imports: [RedisModule, UserModule, AuthModule, CourseModule, GoogleModule],
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
