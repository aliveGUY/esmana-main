import { Module } from '@nestjs/common';
import { RedisClient } from 'src/clients/RedisClient';

@Module({
  providers: [RedisClient],
  exports: [RedisClient],
})
export class RedisModule { }
