import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCourseNotificationDto } from "src/models/dto/CreateCourseNotificationDto";
import { CreateMembershipNotificationDto } from "src/models/dto/CreateMembershipNotificationDto";
import { ENotificationType } from "src/models/enums/ENotificationType";
import { Notification } from "src/models/Notification";
import { User } from "src/models/User";
import { Repository } from "typeorm";

@Injectable()
export class NotificationRepository {
  constructor(
    @InjectRepository(Notification) private readonly notification: Repository<Notification>,
  ) { }

  async createMembershipNotification(notification: CreateMembershipNotificationDto): Promise<CreateMembershipNotificationDto> {
    return this.notification.save(notification)
  }

  async createCourseNotification(notification: CreateCourseNotificationDto): Promise<CreateCourseNotificationDto> {
    return this.notification.save(notification)
  }

  async getAllNotifications(): Promise<Notification[]> {
    return this.notification.find({ relations: ["user", "course", "membership"] })
  }

  async getUserNotifications(user: User): Promise<Notification[]> {
    return this.notification.find({ where: { user: { id: user.id } }, relations: ["user", "course", "membership"] })
  }

  async getNotificationById(id: number): Promise<Notification> {
    return this.notification.findOneOrFail({ where: { id }, relations: ["user", "course", "membership"] })
  }

  async getNotificationByUserAndId(id: number, user: User): Promise<Notification> {
    return this.notification.findOneOrFail({ where: { id, user: { id: user.id } }, relations: ["user", "course", "membership"] })
  }

  async removeNotification(id: number) {
    return this.notification.delete(id)
  }

  async getPendingCoursesByUserId(studentId: number): Promise<Notification[]> {
    return this.notification.find({
      where: {
        user: { id: studentId },
        type: ENotificationType.PENDING_COURSE_PURCHASE
      },
      relations: ["user", "course"]
    })
  }
}