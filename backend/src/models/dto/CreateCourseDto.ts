import { User } from "../User";

export class CreateCourseDto {
  title: string
  students: User[];
  availabilityTime: Date;
  certificate: string;
  price: number
}