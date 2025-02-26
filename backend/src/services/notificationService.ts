import { Injectable } from "@nestjs/common";
import { use } from "passport";
import { Course } from "src/models/Course";
import { CreateCourseNotificationDto } from "src/models/dto/CreateCourseNotificationDto";
import { CreateMembershipNotificationDto } from "src/models/dto/CreateMembershipNotificationDto";
import { ENotificationSeverity } from "src/models/enums/ENotificationSeverity";
import { ENotificationType } from "src/models/enums/ENotificationType";
import { ERoles } from "src/models/enums/ERoles";
import { Membership } from "src/models/Membership";
import { Notification } from "src/models/Notification";
import { User } from "src/models/User";
import { NotificationRepository } from "src/repositories/notificationRepository";

@Injectable()
export class NotificationService {
  constructor(private readonly notificationRepository: NotificationRepository) { }

  async createPendingMembershipPurchaseNotification(user: User, membership: Membership): Promise<CreateMembershipNotificationDto> {
    const notification: CreateMembershipNotificationDto = {
      severity: ENotificationSeverity.WARNING,
      type: ENotificationType.PENDING_MEMBERSHIP_PURCHASE,
      membership,
      user,
    }

    return await this.notificationRepository.createMembershipNotification(notification)
  }

  async createPendingCoursePurchaseNotification(user: User, course: Course): Promise<CreateCourseNotificationDto> {
    const notification: CreateCourseNotificationDto = {
      severity: ENotificationSeverity.WARNING,
      type: ENotificationType.PENDING_COURSE_PURCHASE,
      course,
      user,
    }

    return await this.notificationRepository.createCourseNotification(notification)
  }

  async createMembershipWillExpireNotification(user: User, membership: Membership): Promise<CreateMembershipNotificationDto> {
    const notification: CreateMembershipNotificationDto = {
      severity: ENotificationSeverity.WARNING,
      type: ENotificationType.MEMBERSHIP_WILL_EXPIRE,
      membership,
      user,
    }

    return await this.notificationRepository.createMembershipNotification(notification)
  }

  async createMembershipIsExpiredNotification(user: User, membership: Membership): Promise<CreateMembershipNotificationDto> {
    const notification: CreateMembershipNotificationDto = {
      severity: ENotificationSeverity.ERROR,
      type: ENotificationType.MEMBERSHIP_IS_EXPIRED,
      membership,
      user,
    }

    return await this.notificationRepository.createMembershipNotification(notification)
  }

  async getAllNotifications(user: User): Promise<Notification[]> {
    if (user.role === ERoles.USER) return await this.notificationRepository.getUserNotifications(user)
    return await this.notificationRepository.getAllNotifications()
  }

  async getNotificationById(id: number, user: User): Promise<Notification> {
    if (user.role === ERoles.USER) return await this.notificationRepository.getNotificationByUserAndId(id, user)
    return await this.notificationRepository.getNotificationById(id)
  }
}