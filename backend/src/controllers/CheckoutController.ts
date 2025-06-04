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
  async createSignupCheckoutForm(@Query('lids') lids: string[], @Body() newAccountData: UserRegistrationDto) {
    const lectureIdList = Array.isArray(lids) ? lids : [lids];
    return await this.checkoutService.createSignupCheckoutForm(lectureIdList, newAccountData)
  }

  @Public()
  @Post('google/way-for-pay')
  async googleSignUpAndCheckout(@Query('lids') lids: string[], @Body() { token }) {
    const lectureIdList = Array.isArray(lids) ? lids : [lids];
    return await this.checkoutService.createSignupCheckoutFormWithGoogle(lectureIdList, token)
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
