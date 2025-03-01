import { Injectable } from "@nestjs/common";
import { filter, map, Observable, Subject } from "rxjs";
import { Course } from "src/models/Course";
import { ECast } from "src/models/enums/ECast";
import { ENotificationSeverity } from "src/models/enums/ENotificationSeverity";
import { ENotificationType } from "src/models/enums/ENotificationType";
import { ERoles } from "src/models/enums/ERoles";
import { ESseEventType } from "src/models/enums/ESseEventType";
import { ISseEvent } from "src/models/interfaces/ISseEvent";
import { Notification } from "src/models/Notification";
import { User } from "src/models/User";
import { NotificationRepository } from "src/repositories/notificationRepository";

@Injectable()
export class NotificationService {
  private notificationSubject = new Subject<ISseEvent>();

  constructor(private readonly notificationRepository: NotificationRepository) { }

  async createCoursePurchaseNotification(user: User, course: Course) {
    const createdNotification: Notification = await this.notificationRepository.createCourseNotification({
      severity: ENotificationSeverity.INFO,
      type: ENotificationType.COURSE_PURCHASE,
      course,
      user,
    })

    this.notify({
      cast: ECast.ADMINS,
      type: ESseEventType.ADD_BELL_NOTIFICATION,
      data: createdNotification
    })
    this.notify({
      cast: ECast.ADMINS,
      type: ESseEventType.ADD_TOASTER_NOTIFICATION,
      data: createdNotification
    })
    this.notify({
      cast: ECast.USER,
      userId: createdNotification.user?.id,
      type: ESseEventType.ADD_TOASTER_NOTIFICATION,
      data: createdNotification
    })
  }

  async getAllNotifications(user: User): Promise<Notification[]> {
    if (user.role === ERoles.USER) return await this.notificationRepository.getUserNotifications(user)
    return await this.notificationRepository.getAllNotifications()
  }

  async getNotificationById(id: number, user: User): Promise<Notification> {
    if (user.role === ERoles.USER) return await this.notificationRepository.getNotificationByUserAndId(id, user)
    return await this.notificationRepository.getNotificationById(id)
  }

  async getPendingCoursesByUserId(studentId: number): Promise<Notification[]> {
    return this.notificationRepository.getPendingCoursesByUserId(studentId)
  }

  notify(data: ISseEvent) {
    this.notificationSubject.next(data);
  }

  getNotifications(user: User): Observable<ISseEvent> {
    return this.notificationSubject.asObservable().pipe(
      filter((event: ISseEvent) => {
        if (
          user.role === ERoles.USER
          && event.cast === ECast.USER
          && user.id === event.userId
        ) return true

        if (
          (user.role === ERoles.ADMIN ||
            user.role === ERoles.OWNER)
          && event.cast === ECast.ADMINS
        ) return true

        return false
      })
    )
  }
}