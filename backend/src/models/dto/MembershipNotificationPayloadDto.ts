import { Membership } from "../Membership";
import { User } from "../User";

export class MembershipNotificationPayloadDto {
  membership: Membership
  user: User
}