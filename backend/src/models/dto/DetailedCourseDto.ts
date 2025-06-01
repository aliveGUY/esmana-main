import { EvaluationQuestion } from "../EvaluationQuestion";
import { Lecture } from "../Lecture";

export class DetailedCourseDto {
  id: number;
  thumbnailUrl: string;
  title: string;
  description: string;
  isActive: boolean;
  participationCertificate: string;
  bprCertificate: string;
  lectures: Lecture[];
  bprEvaluation: EvaluationQuestion[];
}