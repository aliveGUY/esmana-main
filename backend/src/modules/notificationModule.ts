import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationService } from 'src/services/notificationService';
import { NotificationRepository } from 'src/repositories/notificationRepository';
import { Notification } from 'src/models/Notification';

@Module({
  imports: [TypeOrmModule.forFeature([Notification])],
  controllers: [],
  providers: [NotificationService, NotificationRepository],
  exports: [NotificationService],
})
export class NotificationModule { }