import { Injectable } from "@nestjs/common";
import { Course } from "src/models/Course";
import { CreateCourseNotificationDto } from "src/models/dto/CreateCourseNotificationDto";
import { CreateMembershipNotificationDto } from "src/models/dto/CreateMembershipNotificationDto";
import { ENotificationSeverity } from "src/models/enums/ENotificationSeverity";
import { ENotificationType } from "src/models/enums/ENotificationType";
import { Membership } from "src/models/Membership";
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
      user
    }

    return await this.notificationRepository.createMembershipNotification(notification)
  }

  async createMembershipIsExpiredNotification(user: User, membership: Membership): Promise<CreateMembershipNotificationDto> {
    const notification: CreateMembershipNotificationDto = {
      severity: ENotificationSeverity.ERROR,
      type: ENotificationType.MEMBERSHIP_IS_EXPIRED,
      membership,
      user
    }

    return await this.notificationRepository.createMembershipNotification(notification)
  }
}