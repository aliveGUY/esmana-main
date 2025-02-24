import { Course } from "../Course"
import { ENotificationSeverity } from "../enums/ENotificationSeverity"
import { ENotificationType } from "../enums/ENotificationType"
import { User } from "../User"

export class CreateCourseNotificationDto {
  severity: ENotificationSeverity
  type: ENotificationType
  course: Course
  user: User
}