import { Injectable } from "@nestjs/common";
import { UserCheckoutInfoDto } from "src/models/dto/UserCheckoutInfoDto";
import { TWayforpayRequestPayment, Wayforpay } from "wayforpay-ts-integration";

export interface IWayForPayClient {
  createPurchase(orderReference: string, checkoutAccountInfo: UserCheckoutInfoDto): Promise<any>;
}

@Injectable()
export class WayForPayClient implements IWayForPayClient {
  private wayForPay: Wayforpay;
  private testMode: boolean;

  constructor() {
    // Check for required environment variables
    if (!process.env.MERCHANT_LOGIN) {
      throw new Error('MERCHANT_LOGIN environment variable is required');
    }
    if (!process.env.MERCHANT_SECRET_KEY) {
      throw new Error('MERCHANT_SECRET_KEY environment variable is required');
    }

    // Determine if we're in test mode
    this.testMode = process.env.NODE_ENV !== 'production' || process.env.WAYFORPAY_TEST_MODE === 'true';

    // Initialize WayForPay client
    this.wayForPay = new Wayforpay({
      merchantLogin: 'test_merch_n1',
      merchantSecret: 'flk3409refn54t54t*FNJRET'
    });

    console.log(`WayForPay initialized in ${this.testMode ? 'TEST' : 'PRODUCTION'} mode`);
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

    const WEBHOOK_URL = `https://04ef-151-76-44-246.ngrok-free.app/checkout/way-for-pay/callback?oid=${orderReference}`
    const REDIRECT_URL = 'http://localhost:3000'

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
