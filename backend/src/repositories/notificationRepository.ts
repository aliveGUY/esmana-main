import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCourseNotificationDto } from "src/models/dto/CreateCourseNotificationDto";
import { CreateMembershipNotificationDto } from "src/models/dto/CreateMembershipNotificationDto";
import { Notification } from "src/models/Notification";
import { Repository } from "typeorm";

@Injectable()
export class NotificationRepository {
  constructor(
    @InjectRepository(Notification) private readonly notification: Repository<Notification>,
  ) { }

  async createMembershipNotification(notification: CreateMembershipNotificationDto): Promise<CreateMembershipNotificationDto> {
    return await this.notification.save(notification)
  }

  async createCourseNotification(notification: CreateCourseNotificationDto): Promise<CreateCourseNotificationDto> {
    return await this.notification.save(notification)
  }
}