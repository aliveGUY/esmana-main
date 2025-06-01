import { IsString, IsObject, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateEvaluationQuestionDto } from "./CreateEvaluationQuestionDto";

export class CreateLectureMaterialsDto {
  @IsOptional()
  @IsString()
  videoUrl?: string;

  @IsOptional()
  @IsObject()
  richText?: object;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateEvaluationQuestionDto)
  evaluation: CreateEvaluationQuestionDto[];
}
