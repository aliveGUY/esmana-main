import { CreateEvaluationQuestionDto } from "./CreateEvaluationQuestionDto";
import { CreateLectureDto } from "./CreateLectureDto";
import { EditEvaluationQuestionDto } from "./EditEvaluationQuestionDto";
import { EditLectureDto } from "./EditLectureDto";

export class EditCourseDto {
  id: number;
  thumbnailUrl?: string;
  title?: string;
  description?: string;
  isActive?: boolean;
  participationCertificate?: string;
  bprCertificate?: string;
  lectures: EditLectureDto[] | CreateLectureDto[];
  bprEvaluation: EditEvaluationQuestionDto[] | CreateEvaluationQuestionDto[];
}
