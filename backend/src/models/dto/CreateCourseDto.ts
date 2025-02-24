import { User } from "../User";

export class CreateCourseDto {
  title: string
  students: User[];
  beginningDate: Date;
  availabilityTime: Date;
  certificate: string;
}