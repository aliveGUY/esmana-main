import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationService } from 'src/services/notificationService';
import { NotificationRepository } from 'src/repositories/notificationRepository';
import { Notification } from 'src/models/Notification';
import { NotificationController } from 'src/controllers/notificationController';

@Module({
  imports: [TypeOrmModule.forFeature([Notification])],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationRepository],
  exports: [NotificationService, NotificationRepository],
})
export class NotificationModule { }