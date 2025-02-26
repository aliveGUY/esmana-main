import { Course } from "../Course";
import { User } from "../User";

export class CourseNotificationPayloadDto {
  user: User
  course: Course
}