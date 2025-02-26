import { User } from "../User"

export class AddStudentsToCourseDto {
  courseId: number
  students: User[]
}