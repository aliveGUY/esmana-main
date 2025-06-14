import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
  IsArray,
} from 'class-validator'
import { Type } from 'class-transformer'
import { EditEvaluationQuestionDto } from './EditEvaluationQuestionDto'
import { CreateEvaluationQuestionDto } from './CreateEvaluationQuestionDto'
import { Lecture } from '../Lecture'
import { EditLectureDto } from './EditLectureDto'

export class EditCourseDto {
  @IsInt()
  id: number

  @IsOptional()
  @IsUrl()
  thumbnailUrl?: string

  @IsOptional()
  @IsString()
  title?: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsBoolean()
  isActive?: boolean

  @IsOptional()
  @IsString()
  participationCertificate?: string

  @IsOptional()
  @IsString()
  bprCertificate?: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Lecture)
  lectures: Partial<EditLectureDto>[]

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EditEvaluationQuestionDto) // assumes polymorphic union if necessary
  bprEvaluation: EditEvaluationQuestionDto[] | CreateEvaluationQuestionDto[]
}
