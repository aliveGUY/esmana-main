import { IsInt, IsArray, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { AnswerDto } from './AnswerDto'

export class LectureEvaluationDto {
  @IsInt()
  lectureId: number

  @IsInt()
  userId: number

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[]
}
