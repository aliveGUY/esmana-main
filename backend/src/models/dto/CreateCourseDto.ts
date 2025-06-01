import { IsString, IsBoolean, IsOptional, IsArray, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateEvaluationQuestionDto } from "./CreateEvaluationQuestionDto";
import { CreateLectureDto } from "./CreateLectureDto";

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  isActive: boolean;

  @IsString()
  @IsNotEmpty()
  participationCertificate: string;

  @IsString()
  @IsNotEmpty()
  bprCertificate: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateLectureDto)
  lectures: CreateLectureDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateEvaluationQuestionDto)
  bprEvaluation: CreateEvaluationQuestionDto[];
}
