import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisService } from './redis.service';
import redisConfig from '../../config/redis.config';

@Module({
  imports: [
    ConfigModule.forFeature(redisConfig),
  ],
  providers: [
    {
      provide: 'IRedisService',
      useClass: RedisService,
    },
  ],
  exports: ['IRedisService'],
})
export class RedisModule {}
