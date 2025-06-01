import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserLecture } from "src/models/UserLecture";
import { Repository } from "typeorm";

export interface IUserLectureRepository { }

@Injectable()
export class UserLectureRepository implements IUserLectureRepository {
  constructor(
    @InjectRepository(UserLecture)
    private readonly userLectureRepository: Repository<UserLecture>,
  ) { }
}