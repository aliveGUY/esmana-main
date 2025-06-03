import { ValidateNested, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { User } from '../User';

export class CreateUserLectureDto {
  @IsNumber()
  userId: number;

  @IsOptional()
  @IsNumber()
  lectureId?: number;

  @IsBoolean()
  isCompleted: boolean;

  @IsBoolean()
  isGotAcademicHours: boolean;

  @IsBoolean()
  isLector: boolean;

  @ValidateNested({ each: true })
  @Type(() => User)
  user: User;
}
