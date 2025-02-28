import { User } from "../User";

export class CreateMembershipDto {
  activationDate: Date;
  paymentDate: Date;
  user: User;
}