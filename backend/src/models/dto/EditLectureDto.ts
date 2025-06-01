import { CreateLectureMaterialsDto } from "./CreateLectureMaterialsDto";

export class EditLectureDto {
  id: number

  title: string;

  description: string;

  price: number;

  startTime: Date;

  endTime: Date;

  materials: CreateLectureMaterialsDto
}