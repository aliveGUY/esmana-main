import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StudentToMemberDto } from "src/models/dto/StudentToMemberDto";
import { Identity } from "src/models/Identity";
import { Repository } from "typeorm";

@Injectable()
export class IdentityRepository {
  constructor(
    @InjectRepository(Identity) private readonly identity: Repository<Identity>
  ) { }

  async extendStudentToMember(userId: number, identity: Partial<Identity>): Promise<void> {

    await this.identity.update({ user: { id: userId } }, identity)
  }
}