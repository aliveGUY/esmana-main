import { IsString, IsArray, IsNotEmpty } from 'class-validator';

export class CreateEvaluationQuestionDto {
  @IsString()
  @IsNotEmpty()
  questionText: string;

  @IsArray()
  @IsString({ each: true })
  correctAnswers: string[];

  @IsArray()
  @IsString({ each: true })
  options: string[];
}
