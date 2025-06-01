import { Lecture } from "../Lecture";

export class StrippedCourseDto {
  id: number;
  thumbnailUrl: string;
  title: string;
  description: string;
  isActive: boolean;
  lectures: Omit<Lecture, 'materials'>[];
}