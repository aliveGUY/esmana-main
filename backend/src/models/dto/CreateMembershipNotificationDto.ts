import { ENotificationSeverity } from "../enums/ENotificationSeverity"
import { ENotificationType } from "../enums/ENotificationType"
import { Membership } from "../Membership"
import { User } from "../User"

export class CreateMembershipNotificationDto {
  severity: ENotificationSeverity
  type: ENotificationType
  membership: Membership
  user: User
}