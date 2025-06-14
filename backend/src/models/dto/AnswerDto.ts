import { IsInt, IsArray, IsString, ArrayNotEmpty } from 'class-validator'

export class AnswerDto {
  @IsInt()
  questionId: number

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  answers: string[]
}
