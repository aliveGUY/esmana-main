import { IsString, IsNumber, IsDateString, IsArray, ValidateNested, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { UserLecture } from "../UserLecture";
import { CreateLectureMaterialsDto } from "./CreateLectureMaterialsDto";

export class CreateLectureDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  price: number;

  @IsDateString()
  startTime: Date;

  @IsDateString()
  endTime: Date;

  @ValidateNested()
  @Type(() => CreateLectureMaterialsDto)
  materials: CreateLectureMaterialsDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserLecture)
  users?: UserLecture[];
}
