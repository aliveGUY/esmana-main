import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Identity } from 'src/models/Identity';
import { IdentityRepository } from 'src/repositories/identityRepository';
import { IdentityService } from 'src/services/identityService';

@Module({
  imports: [TypeOrmModule.forFeature([Identity])],
  controllers: [],
  providers: [IdentityRepository, IdentityService],
  exports: [IdentityService],
})
export class IdentityModule { }