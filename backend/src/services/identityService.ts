import { Injectable } from "@nestjs/common";
import { StudentToMemberDto } from "src/models/dto/StudentToMemberDto";
import { IdentityRepository } from "src/repositories/identityRepository";

@Injectable()
export class IdentityService {
  constructor(private readonly identityRepository: IdentityRepository) { }

  async extendStudentToMember(user: StudentToMemberDto): Promise<void> {
    const { userId, ...identity } = user
    return await this.identityRepository.extendStudentToMember(userId, identity)
  }

  async checkIsIdentityComplete(userId: number): Promise<boolean> {
    return await this.identityRepository.isIdentityComplete(userId)
  }
}