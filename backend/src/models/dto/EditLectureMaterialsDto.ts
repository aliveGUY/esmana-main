import { IsString, IsObject, IsArray, ValidateNested, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { EditEvaluationQuestionDto } from "./EditEvaluationQuestionDto";
import { CreateEvaluationQuestionDto } from './CreateEvaluationQuestionDto';

export class EditLectureMaterialsDto {
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  videoUrl?: string;

  @IsOptional()
  @IsObject()
  richText?: object;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  evaluation?: EditEvaluationQuestionDto[] | CreateEvaluationQuestionDto[];
}
