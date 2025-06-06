import { Injectable, Inject, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { User } from '../models/User';
import { UserLoginDto } from '../models/dto/UserLoginDto';
import { UserGoogleLoginDto } from '../models/dto/UserGoogleLoginDto';
import { UserDto } from '../models/dto/UserDto';
import { IUserRepository } from '../repositories/UserRepository';
import { ITokenRepository } from '../repositories/TokenRepository';
import * as bcrypt from 'bcrypt';
import { IGoogleClient } from 'src/infrastructure/GoogleClient';
import { ERoles } from 'src/models/enums/ERoles';
import { UserRegistrationDto } from 'src/models/dto/UserRegistrationDto';

export interface IAuthService {
  registerUser(newAccountData: UserRegistrationDto): Promise<UserDto>
  loginLocal(dto: UserLoginDto): Promise<{ user: UserDto; accessToken: string }>;
  loginGoogle(dto: UserGoogleLoginDto): Promise<{ user: UserDto; accessToken: string }>;
  refreshToken(accessToken: string): Promise<{ user: UserDto; accessToken: string } | null>;
  logout(accessToken: string): Promise<void>;
}

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    @Inject('ITokenRepository') private readonly tokenRepository: ITokenRepository,
    @Inject('IGoogleClient') private readonly googleClient: IGoogleClient
  ) { }

  async registerUser(newAccountData: UserRegistrationDto): Promise<UserDto> {
    const hashedPassword = await bcrypt.hash(newAccountData.password, 12);

    const user: Partial<User> = {
      firstName: newAccountData.firstName,
      lastName: newAccountData.lastName,
      email: newAccountData.email,
      phone: newAccountData.phone,
      password: hashedPassword,
      isEmailVerified: false,
      roles: [ERoles.ADMIN],
    }

    return await this.userRepository.create(user)
  }

  async loginLocal(dto: UserLoginDto): Promise<{ user: UserDto; accessToken: string }> {
    const user = await this.userRepository.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.googleId) {
      throw new BadRequestException('Please use Google login for this account');
    }

    const isPasswordValid = await this.validatePassword(user, dto.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { accessToken } = await this.generateLinkedTokens(user);

    return { user: this.userToDto(user), accessToken };
  }

  async loginGoogle(dto: UserGoogleLoginDto): Promise<{ user: UserDto; accessToken: string }> {
    const { googleId } = await this.googleClient.verifyAuthToken(dto.token)
    const user = await this.userRepository.findByGoogleId(googleId);

    if (!user) {
      throw new UnauthorizedException('Google account not found');
    }

    const { accessToken } = await this.generateLinkedTokens(user);

    return { user: this.userToDto(user), accessToken };
  }

  async refreshToken(accessToken: string): Promise<{ user: UserDto; accessToken: string } | null> {
    try {
      const tokenData = await this.tokenRepository.validateToken(accessToken);

      if (!tokenData) {
        return null;
      }

      const refreshTokenId = tokenData.refreshTokenId;
      if (!refreshTokenId) {
        return null;
      }

      const refreshTokenData = await this.tokenRepository.validateToken(refreshTokenId);
      if (!refreshTokenData || refreshTokenData.type !== 'refresh') {
        return null;
      }

      const user = await this.userRepository.findById(tokenData.userId);
      if (!user) {
        return null;
      }

      const { accessToken: newAccessToken } = await this.generateLinkedTokens(user);

      await this.tokenRepository.blacklistToken(accessToken);

      return { user: this.userToDto(user), accessToken: newAccessToken };
    } catch (error) {
      return null;
    }
  }

  async logout(accessToken: string): Promise<void> {
    const tokenData = await this.tokenRepository.validateToken(accessToken);

    await this.tokenRepository.blacklistToken(accessToken);

    if (tokenData?.refreshTokenId) {
      await this.tokenRepository.blacklistToken(tokenData.refreshTokenId);
    }
  }

  private async generateLinkedTokens(user: User): Promise<{ accessToken: string; refreshToken: string }> {
    const refreshToken = await this.tokenRepository.generateRefreshToken(user.id, {
      email: user.email,
      roles: user.roles,
    });

    const accessToken = await this.tokenRepository.generateAccessToken(user.id, {
      email: user.email,
      roles: user.roles,
      refreshTokenId: refreshToken,
    });

    return { accessToken, refreshToken };
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
}
