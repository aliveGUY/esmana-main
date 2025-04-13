import { Module, Global } from '@nestjs/common';
import { RedisClient } from '../clients/RedisClient';

@Global()
@Module({
  providers: [RedisClient],
  exports: [RedisClient],
})
export class RedisModule {}
