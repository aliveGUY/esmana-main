import { Course } from "../Course"
import { User } from "../User"

export class ApproveCourseNotificationDto {
  id: number
  user: User
  course: Course
}