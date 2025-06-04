import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UserCheckoutInfoDto } from "src/models/dto/UserCheckoutInfoDto";
import { TWayforpayRequestPayment, Wayforpay } from "wayforpay-ts-integration";

export interface IWayForPayClient {
  createPurchase(orderReference: string, checkoutAccountInfo: UserCheckoutInfoDto): Promise<any>;
}

@Injectable()
export class WayForPayClient implements IWayForPayClient {
  private wayForPay: Wayforpay;

  constructor(private readonly configService: ConfigService) {
    const redisConfig = this.configService.get('way-for-pay');

    this.wayForPay = new Wayforpay({
      merchantLogin: redisConfig.merchantLogin,
      merchantSecret: redisConfig.merchantSecretKey
    });
  }

  async createPurchase(orderReference: string, checkoutAccountInfo: UserCheckoutInfoDto): Promise<any> {
    if (!process.env.DOMAIN) {
      throw new Error('DOMAIN environment variable is required');
    }

    const cart = [
      {
        quantity: 1,
        product: {
          name: 'Test Course',
          price: 1
        }
      }
    ];

    const WEBHOOK_URL = `https://api.esmana-main.org/checkout/way-for-pay/callback?oid=${orderReference}`
    const REDIRECT_URL = 'https://portal.esmana-main.org'

    const purchaseOptions: TWayforpayRequestPayment = {
      domain: process.env.DOMAIN,
      language: 'UA',
      currency: 'UAH',
      serviceUrl: WEBHOOK_URL,
      returnUrl: REDIRECT_URL,
      orderReference: orderReference,
      clientFirstName: checkoutAccountInfo.firstName,
      clientLastName: checkoutAccountInfo.lastName,
      clientEmail: checkoutAccountInfo.email,
      clientPhone: checkoutAccountInfo.phone,
    };

    return await this.wayForPay.purchase(cart, purchaseOptions);
  }
}
