import { Course } from "../Course";
import { ENotificationSeverity } from "../enums/ENotificationSeverity";
import { ENotificationType } from "../enums/ENotificationType";
import { Membership } from "../Membership";
import { User } from "../User";

export class GeneralNotification {
  id: number | null;
  membership: Membership | null
  course: Course | null;
  user: User | null;
  seen: boolean;
  severity: ENotificationSeverity;
  type: ENotificationType;
  createdAt: Date
}