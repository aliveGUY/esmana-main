import { User } from "../User";
import { UserLecture } from "../UserLecture";
import { CreateLectureMaterialsDto } from "./CreateLectureMaterialsDto";
import { EditLectureMaterialsDto } from "./EditLectureMaterialsDto";

export class EditLectureDto {
  id: number

  title: string;

  description: string;

  price: number;

  startTime: Date;

  endTime: Date;

  materials: EditLectureMaterialsDto

  users: UserLecture[]
}
