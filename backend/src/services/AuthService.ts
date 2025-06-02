import { Injectable, Inject, UnauthorizedException, BadRequestException, ConflictException } from '@nestjs/common';
import { User } from '../models/User';
import { UserLoginDto } from '../models/dto/UserLoginDto';
import { UserRegistrationDto } from '../models/dto/UserRegistrationDto';
import { UserGoogleLoginDto } from '../models/dto/UserGoogleLoginDto';
import { UserGoogleRegistrationDto } from '../models/dto/UserGoogleRegistrationDto';
import { UserDto } from '../models/dto/UserDto';
import { IUserRepository } from '../repositories/UserRepository';
import { ITokenRepository } from '../repositories/TokenRepository';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { IGoogleClient } from 'src/infrastructure/GoogleClient';
import { ERoles } from 'src/models/enums/ERoles';

export interface IAuthService {
  registerLocal(dto: UserRegistrationDto): Promise<{ user: UserDto; accessToken: string }>;
  loginLocal(dto: UserLoginDto): Promise<{ user: UserDto; accessToken: string }>;
  registerGoogle(dto: UserGoogleRegistrationDto): Promise<{ user: UserDto; accessToken: string }>;
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

  async registerLocal(dto: UserRegistrationDto): Promise<{ user: UserDto; accessToken: string }> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await this.hashPassword(dto.password);

    const userData: Partial<User> = {
      firstName: dto.firstName,
      middleName: dto.middleName,
      lastName: dto.lastName,
      email: dto.email,
      password: hashedPassword,
      googleId: undefined,
      profilePicture: undefined,
      isEmailVerified: false,
      roles: [ERoles.ADMIN],
    };

    const user = await this.userRepository.create(userData);
    const { accessToken } = await this.generateLinkedTokens(user);

    return { user: this.userToDto(user), accessToken };
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

  async registerGoogle(dto: UserGoogleRegistrationDto): Promise<{ user: UserDto; accessToken: string }> {
    const existingUserByEmail = await this.userRepository.findByEmail(dto.email);
    if (existingUserByEmail) {
      throw new ConflictException('User with this email already exists');
    }

    const existingUserByGoogleId = await this.userRepository.findByGoogleId(dto.googleId);
    if (existingUserByGoogleId) {
      throw new ConflictException('User with this Google ID already exists');
    }

    const userData: Partial<User> = {
      firstName: dto.firstName,
      middleName: dto.middleName,
      lastName: dto.lastName,
      email: dto.email,
      password: undefined,
      googleId: dto.googleId,
      profilePicture: undefined,
      isEmailVerified: true,
      roles: [ERoles.USER],
    };

    const user = await this.userRepository.create(userData);
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

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
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
