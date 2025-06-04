import { Inject, Injectable } from "@nestjs/common";
import { IRedisClient } from "src/infrastructure/RedisClient";
import { IWayForPayClient } from "src/infrastructure/WayForPayClient";
import { UserCheckoutInfoDto } from "src/models/dto/UserCheckoutInfoDto";
import { UserRegistrationDto } from "src/models/dto/UserRegistrationDto";
import { TWayforpayResponseTransactionDetails } from "wayforpay-ts-integration";

export interface ICheckoutService {
  createCheckoutForm(lectureIdList: string[], newAccountData: UserRegistrationDto)
  handleCheckoutWebhook(orderId: string, callbackData: TWayforpayResponseTransactionDetails): Promise<object>
}

@Injectable()
export class CheckoutService implements ICheckoutService {
  constructor(
    @Inject('IWayForPayClient') private readonly wayForPayClient: IWayForPayClient,
    @Inject('IRedisClient') private readonly redisClient: IRedisClient,

  ) { }

  async createCheckoutForm(lectureIdList: string[], newAccountData: UserRegistrationDto) {
    const orderRef = `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const HOURS_24 = 24 * 60 * 60

    const checkoutDetails: UserCheckoutInfoDto = {
      firstName: newAccountData.firstName,
      lastName: newAccountData.lastName,
      email: newAccountData.email,
      phone: newAccountData.phone
    }

    await this.redisClient.saveKey(orderRef, JSON.stringify(newAccountData), HOURS_24)
    return await this.wayForPayClient.createPurchase(orderRef, checkoutDetails);
  }

  async handleCheckoutWebhook(orderId: string, callbackData: TWayforpayResponseTransactionDetails): Promise<object> {
    if (callbackData.transactionStatus === 'Approved') {

      const newAccountData = await this.redisClient.getKey(orderId)
      await this.redisClient.deleteKey(orderId)

      console.log('SHOULD REGISTER USER', { newAccountData, callbackData })
      return { success: true };
    }

    console.log('TRANSACTION FAILED ', { callbackData })
    return { success: true };
  }
}
