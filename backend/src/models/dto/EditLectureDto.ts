import {
  IsInt,
  IsOptional,
  IsString,
  IsNumber,
  IsDate,
  ValidateNested,
  IsArray,
  IsDefined,
} from 'class-validator'
import { Type } from 'class-transformer'
import { UserLecture } from '../UserLecture'
import { EditLectureMaterialsDto } from './EditLectureMaterialsDto'

export class EditLectureDto {
  @IsOptional()
  @IsInt()
  id: number

  @IsString()
  title: string

  @IsString()
  description: string

  @IsNumber()
  price: number

  @Type(() => Date)
  @IsDate()
  startTime: Date

  @Type(() => Date)
  @IsDate()
  endTime: Date

  @ValidateNested()
  @Type(() => EditLectureMaterialsDto)
  @IsDefined()
  materials: EditLectureMaterialsDto

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserLecture)
  users: UserLecture[]
}
