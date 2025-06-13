import { User } from "../User";

export class CreateLectorDetailsDto {
  credentials: string;
  biography: object;
  user: User;
}