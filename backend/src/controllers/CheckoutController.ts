import { Controller, Inject, Post, Body, Query } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { UserRegistrationDto } from 'src/models/dto/UserRegistrationDto';
import { ICheckoutService } from 'src/services/CheckoutService';
import { TWayforpayResponseTransactionDetails } from 'wayforpay-ts-integration';

@Controller('checkout')
export class CheckoutController {
  constructor(
    @Inject('ICheckoutService') private readonly checkoutService: ICheckoutService,
  ) { }

  @Public()
  @Post('way-for-pay')
  async wayForPayCheckout(@Query('lids') lectureIdList: string[], @Body() newAccountData: UserRegistrationDto) {
    return await this.checkoutService.createCheckoutForm(lectureIdList, newAccountData)
  }

  @Public()
  @Post('way-for-pay/callback')
  async wayForPayCallback(@Query('oid') orderId: string, @Body() raw: Record<string, string>
  ) {
    const [jsonString] = Object.keys(raw)
    const callbackData: TWayforpayResponseTransactionDetails = JSON.parse(jsonString)
    return await this.checkoutService.handleCheckoutWebhook(orderId, callbackData)
  }
}
