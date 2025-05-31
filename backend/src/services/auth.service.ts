import { Injectable, Inject, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { User } from '../models/user.model';
import { LoginDto, RegisterDto, RefreshTokenDto, GoogleUserDto, AuthResponse } from '../models/auth.dto';
import { AuthProvider, TokenType } from '../models/enums';
import { IUserService } from './user.service';
import { ITokenService } from './token.service';

export interface IAuthService {
  register(registerDto: RegisterDto): Promise<AuthResponse>;
  login(loginDto: LoginDto): Promise<AuthResponse>;
  googleAuth(googleUser: GoogleUserDto): Promise<AuthResponse>;
  refreshToken(refreshTokenDto: RefreshTokenDto): Promise<AuthResponse>;
  logout(accessToken: string): Promise<void>;
  logoutAll(userId: string): Promise<void>;
  validateUser(email: string, password: string): Promise<User | null>;
  validateGoogleUser(googleUser: GoogleUserDto): Promise<User>;
}

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('IUserService') private readonly userService: IUserService,
    @Inject('ITokenService') private readonly tokenService: ITokenService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const user = await this.userService.createUser({
      email: registerDto.email,
      password: registerDto.password,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      provider: AuthProvider.LOCAL,
    });

    return this.generateAuthResponse(user);
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateAuthResponse(user);
  }

  async googleAuth(googleUser: GoogleUserDto): Promise<AuthResponse> {
    const user = await this.validateGoogleUser(googleUser);
    return this.generateAuthResponse(user);
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<AuthResponse> {
    try {
      // Validate the refresh token
      const tokenData = await this.tokenService.validateToken(refreshTokenDto.refreshToken);
      
      if (!tokenData || tokenData.type !== TokenType.REFRESH) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Get the user
      const user = await this.userService.findById(tokenData.userId);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Generate new tokens
      const accessToken = await this.tokenService.generateAccessToken(user.id, {
        email: user.email,
        roles: user.roles,
      });
      const newRefreshToken = await this.tokenService.generateRefreshToken(user.id);

      // Revoke the old refresh token
      await this.tokenService.blacklistToken(refreshTokenDto.refreshToken);

      return {
        accessToken,
        refreshToken: newRefreshToken,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          profilePicture: user.profilePicture,
          provider: user.provider,
          isEmailVerified: user.isEmailVerified,
        },
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(accessToken: string): Promise<void> {
    console.log('🚪 [Auth] Logging out user with token:', accessToken.substring(0, 10) + '...');
    
    // Blacklist the access token
    await this.tokenService.blacklistToken(accessToken);
  }

  async logoutAll(userId: string): Promise<void> {
    console.log('🚪 [Auth] Logging out all sessions for user:', userId);
    
    // Revoke all user tokens
    await this.tokenService.revokeUserTokens(userId);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    
    if (!user) {
      return null;
    }

    if (!user.isLocalUser()) {
      throw new BadRequestException('Please use Google login for this account');
    }

    const isPasswordValid = await this.userService.validatePassword(user, password);
    
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async validateGoogleUser(googleUser: GoogleUserDto): Promise<User> {
    // Try to find existing user by Google ID
    let user = await this.userService.findByGoogleId(googleUser.googleId);
    
    if (user) {
      return user;
    }

    // Try to find existing user by email
    user = await this.userService.findByEmail(googleUser.email);
    
    if (user) {
      // User exists with same email but different provider
      if (user.isLocalUser()) {
        // Link Google account to existing local account
        return this.userService.updateUser(user.id, {
          googleId: googleUser.googleId,
          profilePicture: googleUser.profilePicture,
          isEmailVerified: true,
        });
      }
    }

    // Create new Google user
    return this.userService.createUser({
      email: googleUser.email,
      firstName: googleUser.firstName,
      lastName: googleUser.lastName,
      googleId: googleUser.googleId,
      profilePicture: googleUser.profilePicture,
      provider: AuthProvider.GOOGLE,
    });
  }

  private async generateAuthResponse(user: User): Promise<AuthResponse> {
    console.log('🔑 [Auth] Generating tokens for user:', user.email);
    
    // Generate tokens (session tracking is done via tokens only)
    const accessToken = await this.tokenService.generateAccessToken(user.id, {
      email: user.email,
      roles: user.roles,
    });
    const refreshToken = await this.tokenService.generateRefreshToken(user.id);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePicture: user.profilePicture,
        provider: user.provider,
        isEmailVerified: user.isEmailVerified,
      },
    };
  }
}
