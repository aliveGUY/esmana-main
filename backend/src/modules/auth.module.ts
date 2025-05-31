import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';


// Configuration
import tokenConfig from '../config/token.config';
import googleConfig from '../config/google.config';

// Infrastructure
import { RedisModule } from '../infrastructure/redis/redis.module';

// Repositories
import { UserRepository } from '../repositories/UserRepository';
import { TokenRepository } from '../repositories/TokenRepository';

// Services
import { AuthService } from '../services/AuthService';



// Guards
import { TokenAuthGuard } from '../guards/TokenAuthGuard';

// Controllers
import { AuthController } from '../controllers/AuthController';
import { UserEntity } from '../entities/user.entity';

@Module({
  imports: [
    ConfigModule.forFeature(tokenConfig),
    ConfigModule.forFeature(googleConfig),
    TypeOrmModule.forFeature([UserEntity]),
    RedisModule,

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
      provide: 'IAuthService',
      useClass: AuthService,
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
export class AuthModule {}
