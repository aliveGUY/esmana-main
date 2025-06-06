import { ValidateNested, IsBoolean, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { User } from '../User';
import { Lecture } from '../Lecture';

export class CreateUserLectureDto {
  @IsBoolean()
  isCompleted: boolean;

  @IsBoolean()
  isGotAcademicHours: boolean;

  @IsBoolean()
  isLector: boolean;

  @ValidateNested()
  @Type(() => User)
  user: User;

  @IsOptional()
  @ValidateNested()
  @Type(() => Lecture)
  lecture?: Lecture;
}
