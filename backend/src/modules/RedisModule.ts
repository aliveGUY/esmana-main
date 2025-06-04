import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import redisConfig from "src/config/redis.config";
import { RedisClient } from "src/infrastructure/RedisClient";

@Module({
  imports: [
    ConfigModule.forFeature(redisConfig),
  ],
  providers: [
    {
      provide: 'IRedisClient',
      useClass: RedisClient,
    },
  ],
  exports: ['IRedisClient'],
})
export class RedisModule {}
