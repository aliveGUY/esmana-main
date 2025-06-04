import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { IGoogleClient } from "src/infrastructure/GoogleClient";
import { IRedisClient } from "src/infrastructure/RedisClient";
import { IWayForPayClient } from "src/infrastructure/WayForPayClient";
import { UserCheckoutInfoDto } from "src/models/dto/UserCheckoutInfoDto";
import { UserGoogleRegistrationDto } from "src/models/dto/UserGoogleRegistrationDto";
import { UserRegistrationDto } from "src/models/dto/UserRegistrationDto";
import { IUserRepository } from "src/repositories/UserRepository";
import { TWayforpayResponseTransactionDetails } from "wayforpay-ts-integration";
import * as bcrypt from 'bcrypt';
import { User } from "src/models/User";
import { CreateUserLectureDto } from "src/models/dto/CreateUserLectureDto";
import { IUserLectureRepository } from "src/repositories/UserLectureRepository";

const HOURS_24 = 24 * 60 * 60

export interface ICheckoutService {
  createSignupCheckoutForm(lectureIdList: string[], newAccountData): Promise<string>
  createSignupCheckoutFormWithGoogle(lectureIdList: string[], token: string): Promise<string>
  handleCheckoutWebhook(orderId: string, callbackData: TWayforpayResponseTransactionDetails): Promise<object>
}

@Injectable()
export class CheckoutService implements ICheckoutService {
  constructor(
    @Inject('IWayForPayClient') private readonly wayForPayClient: IWayForPayClient,
    @Inject('IRedisClient') private readonly redisClient: IRedisClient,
    @Inject('IGoogleClient') private readonly googleClient: IGoogleClient,
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    @Inject('IUserLectureRepository') private readonly userLectureRepository: IUserLectureRepository,
  ) { }

  async createSignupCheckoutFormWithGoogle(lectureIdList: string[], token: string): Promise<string> {
    const googleUser = await this.googleClient.verifyAuthToken(token)
    const existingUserByEmail = await this.userRepository.findByEmail(googleUser.email);

    if (existingUserByEmail) {
      throw new ConflictException('User with this email already exists');
    }

    const orderRef = this.generateOrderRef()

    const checkoutDetails: UserCheckoutInfoDto = {
      firstName: googleUser.firstName,
      lastName: googleUser.lastName,
      email: googleUser.email,
    }

    const newAccountData: UserGoogleRegistrationDto = {
      firstName: googleUser.firstName,
      lastName: googleUser.lastName,
      email: googleUser.email,
      googleId: googleUser.googleId,
      isEmailVerified: googleUser.isEmailVerified
    }

    await this.redisClient.saveKey(orderRef, JSON.stringify({ newAccountData, lectureIdList }), HOURS_24)
    return await this.wayForPayClient.createPurchase(orderRef, checkoutDetails);
  }

  async createSignupCheckoutForm(lectureIdList: string[], newAccountDataDto: UserRegistrationDto): Promise<string> {
    const existingUserByEmail = await this.userRepository.findByEmail(newAccountDataDto.email);

    if (existingUserByEmail) {
      throw new ConflictException('User with this email already exists');
    }

    const orderRef = this.generateOrderRef()
    const hashedPassword = await bcrypt.hash(newAccountDataDto.password, 12);

    const checkoutDetails: UserCheckoutInfoDto = {
      firstName: newAccountDataDto.firstName,
      lastName: newAccountDataDto.lastName,
      email: newAccountDataDto.email,
      phone: newAccountDataDto.phone,
    }

    const newAccountData: UserRegistrationDto = {
      firstName: newAccountDataDto.firstName,
      lastName: newAccountDataDto.lastName,
      email: newAccountDataDto.email,
      phone: newAccountDataDto.phone,
      password: hashedPassword,
    }

    await this.redisClient.saveKey(orderRef, JSON.stringify({ newAccountData, lectureIdList }), HOURS_24)
    return await this.wayForPayClient.createPurchase(orderRef, checkoutDetails);
  }

  async handleCheckoutWebhook(orderReference: string, callbackData: TWayforpayResponseTransactionDetails): Promise<object> {
    const orderJson = await this.redisClient.getKey(orderReference)

    if (orderJson && callbackData.transactionStatus === 'Approved') {
      const newAccountData: Partial<User> = JSON.parse(orderJson).newAccountData
      const lectureIdList: string[] = JSON.parse(orderJson).lectureIdList

      await this.redisClient.deleteKey(orderReference)

      const newUser = await this.userRepository.create(newAccountData)

      await this.grantAccessToLectures(lectureIdList, newUser)

      return { orderReference, status: 'accept' }
    }

    console.log('TRANSACTION FAILED ', { callbackData })
    return { orderReference, status: 'accept' }
  }

  private generateOrderRef() {
    return `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private async grantAccessToLectures(lectureIdList: string[], newAccountData: User): Promise<void> {
    const userId = newAccountData.id
    console.log('SHOULD CREATE USER', { newAccountData, lectureIdList })

    const promises = lectureIdList.map(lectureId => {
      const userLecture: CreateUserLectureDto = {
        userId: userId,
        lectureId: Number(lectureId),
        isCompleted: false,
        isGotAcademicHours: false,
        isLector: false,
        user: newAccountData
      }

      return this.userLectureRepository.createUserLecture(userLecture)
    })

    await Promise.all(promises)
  }
}
