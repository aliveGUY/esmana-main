import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Configuration
import googleConfig from '../config/google.config';

// Repositories
import { UserRepository } from '../repositories/UserRepository';
import { TokenRepository } from '../repositories/TokenRepository';
import { LectorDetailsRepository } from '../repositories/LectorDetailsRepository';

// Services
import { AuthService } from '../services/AuthService';

// Guards
import { TokenAuthGuard } from '../guards/TokenAuthGuard';

// Controllers
import { AuthController } from '../controllers/AuthController';
import { GoogleClient } from 'src/infrastructure/GoogleClient';
import { User } from '../models/User';
import { LectorDetails } from '../models/LectorDetails';
import { RedisModule } from './RedisModule';
import { CertificateService } from 'src/services/CertificateService';
import { GoogleModule } from './GoogleModule';

@Module({
  imports: [
    ConfigModule.forFeature(googleConfig),
    TypeOrmModule.forFeature([User, LectorDetails]),
    RedisModule,
    GoogleModule,
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
    {
      provide: 'ILectorDetailsRepository',
      useClass: LectorDetailsRepository,
    },
    // Services
    {
      provide: 'IAuthService',
      useClass: AuthService,
    },
    {
      provide: 'ICertificateService',
      useClass: CertificateService
    },

    // Guards
    TokenAuthGuard,
  ],
  exports: [
    'IAuthService',
    'ITokenRepository',
    TokenAuthGuard,
  ],
})
export class AuthModule { }
