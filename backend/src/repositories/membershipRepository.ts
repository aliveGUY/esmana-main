import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateMembershipDto } from "src/models/dto/CreateMembershipDto";
import { Membership } from "src/models/Membership";
import { Repository } from "typeorm";

@Injectable()
export class membershipRepository {
  constructor(
    @InjectRepository(Membership) private readonly lecture: Repository<Membership>,
  ) { }

  async createMembership(membership: CreateMembershipDto) {

  }
}