import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

// Configuration
import tokenConfig from '../config/token.config';
import googleConfig from '../config/google.config';

// Infrastructure
import { RedisModule } from '../infrastructure/redis/redis.module';

// Repositories
import { UserRepository } from '../repositories/user.repository';
import { TokenRepository } from '../repositories/token.repository';

// Entities
import { UserEntity } from '../entities/user.entity';

// Services
import { UserService } from '../services/user.service';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';

// Strategies
import { LocalStrategy } from '../strategies/local.strategy';
import { GoogleStrategy } from '../strategies/google.strategy';

// Guards
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { TokenAuthGuard } from '../guards/token-auth.guard';
import { GoogleAuthGuard } from '../guards/google-auth.guard';

// Controllers
import { AuthController } from '../controllers/auth.controller';

@Module({
  imports: [
    ConfigModule.forFeature(tokenConfig),
    ConfigModule.forFeature(googleConfig),
    TypeOrmModule.forFeature([UserEntity]),
    RedisModule,
    PassportModule.register({ defaultStrategy: 'local' }),
  ],
  controllers: [AuthController],
  providers: [
    // Repositories
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'ITokenRepository',
      useClass: TokenRepository,
    },
    // Services
    {
      provide: 'IUserService',
      useClass: UserService,
    },
    {
      provide: 'ITokenService',
      useClass: TokenService,
    },
    {
      provide: 'IAuthService',
      useClass: AuthService,
    },
    // Strategies
    LocalStrategy,
    GoogleStrategy,
    // Guards
    LocalAuthGuard,
    TokenAuthGuard,
    GoogleAuthGuard,
  ],
  exports: [
    'IAuthService',
    'IUserService',
    'ITokenService',
    TokenAuthGuard,
  ],
})
export class AuthModule {}
