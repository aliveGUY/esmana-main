import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Membership } from "src/models/Membership";
import { Repository } from "typeorm";

export interface IMembershipRepository { }

@Injectable()
export class MembershipRepository implements IMembershipRepository {
  constructor(
    @InjectRepository(Membership)
    private readonly membershipRepository: Repository<Membership>,
  ) { }
}