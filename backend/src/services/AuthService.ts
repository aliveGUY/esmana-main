import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { User } from '../models/User';
import { UserLoginDto } from '../models/dto/UserLoginDto';
import { UserGoogleLoginDto } from '../models/dto/UserGoogleLoginDto';
import { UserDto } from '../models/dto/UserDto';
import { IUserRepository } from '../repositories/UserRepository';
import { ITokenRepository, ONE_DAY } from '../repositories/TokenRepository';
import * as bcrypt from 'bcrypt';
import { IGoogleClient } from 'src/infrastructure/GoogleClient';
import { UserRegistrationDto } from 'src/models/dto/UserRegistrationDto';
import { Request, Response } from 'express';
import { AccessTokenData } from 'src/models/Token';
import { ILectorDetailsRepository } from 'src/repositories/LectorDetailsRepository';
import { CreateLectorDetailsDto } from 'src/models/dto/CreateLectorDetailsDto';
import { Express } from 'express';

export interface IAuthService {
  registerUser(newAccountData: UserRegistrationDto, profilePictureFile?: Express.Multer.File): Promise<UserDto>
  loginLocal(response: Response, dto: UserLoginDto): Promise<UserDto>;
  loginGoogle(response: Response, dto: UserGoogleLoginDto): Promise<UserDto>;
  logout(response: Response, accessToken: string): Promise<void>;
  connectGoogle(googleToken: string, request: Request): Promise<void>
  refresh(response: Request): Promise<UserDto>;
}

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    @Inject('ILectorDetailsRepository') private readonly lectorDetailsRepository: ILectorDetailsRepository,
    @Inject('ITokenRepository') private readonly tokenRepository: ITokenRepository,
    @Inject('IGoogleClient') private readonly googleClient: IGoogleClient
  ) { }

  async registerUser(newAccountData: UserRegistrationDto, profilePictureFile?: Express.Multer.File): Promise<UserDto> {
    const hashedPassword = await bcrypt.hash(newAccountData.password, 12);

    let profilePicture = '';
    if (profilePictureFile) {
      profilePicture = await this.googleClient.uploadMulterFileToDrive(profilePictureFile);
    }

    const user: Partial<User> = {
      firstName: newAccountData.firstName,
      lastName: newAccountData.lastName,
      email: newAccountData.email,
      phone: newAccountData.phone,
      password: hashedPassword,
      isEmailVerified: false,
      roles: newAccountData.roles,
      profilePicture
    }

    const newUser = await this.userRepository.create(user)

    if (newAccountData.lectorDetails) {
      const details: CreateLectorDetailsDto = {
        credentials: newAccountData.lectorDetails.credentials,
        biography: newAccountData.lectorDetails.biography,
        user: newUser
      }
      await this.lectorDetailsRepository.createLectorDetails(details)
    }

    return await this.userRepository.getById(newUser.id)
  }

  async loginLocal(response: Response, dto: UserLoginDto): Promise<UserDto> {
    const user = await this.userRepository.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.validatePassword(user, dto.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokenData: AccessTokenData = {
      userId: user.id,
      email: user.email,
      roles: user.roles
    }

    const accessToken = await this.tokenRepository.generateAccessToken(tokenData)
    await this.tokenRepository.generateRefreshToken(accessToken)
    this.setAccessTokenToCookies(response, accessToken)

    return this.userToDto(user)
  }

  async refresh(request: Request): Promise<UserDto> {
    const accessTokenData = request.user as AccessTokenData
    const user = await this.userRepository.findByEmail(accessTokenData.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.userToDto(user)
  }

  async loginGoogle(response: Response, dto: UserGoogleLoginDto): Promise<UserDto> {
    const { googleId } = await this.googleClient.verifyAuthToken(dto.token)
    const user = await this.userRepository.findByGoogleId(googleId);

    if (!user) {
      throw new UnauthorizedException('Google account not found');
    }

    const tokenData: AccessTokenData = {
      userId: user.id,
      email: user.email,
      roles: user.roles
    }

    const accessToken = await this.tokenRepository.generateAccessToken(tokenData)
    await this.tokenRepository.generateRefreshToken(accessToken)
    this.setAccessTokenToCookies(response, accessToken)

    return this.userToDto(user)
  }

  async logout(response: Response, accessToken: string): Promise<void> {
    await this.tokenRepository.deleteAccessAndRefreshTokens(accessToken);
    response.clearCookie('access_token');
  }

  async connectGoogle(googleToken: string, request: Request): Promise<void> {
    const accessToken = request.cookies?.access_token

    if (!accessToken) {
      throw new Error('No access token found');
    }

    const tokenData = await this.tokenRepository.getAccessTokenData(accessToken);
    if (!tokenData) {
      throw new Error('User not found');
    }

    const { userId } = tokenData
    const { googleId } = await this.googleClient.verifyAuthToken(googleToken)

    this.userRepository.setGoogleId(userId, googleId)
  }

  private async validatePassword(user: User, password: string): Promise<boolean> {
    if (!user.password) {
      return false;
    }
    return bcrypt.compare(password, user.password);
  }

  private userToDto(user: User): UserDto {
    return {
      id: user.id,
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      email: user.email,
      profilePicture: user.profilePicture,
      isEmailVerified: user.isEmailVerified,
      roles: user.roles,
    };
  }

  private setAccessTokenToCookies(response: Response, accessToken: string) {
    response.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: ONE_DAY,
    });
  }
}
