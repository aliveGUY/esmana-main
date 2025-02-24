import { Course } from "../Course";
import { User } from "../User";

export class CreateLectureDto {
  title: string
  startTime: Date;
  endTime: Date
  duration: string
  speakers: User[]
  course: Course;
}
