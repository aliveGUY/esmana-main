import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LectorDetails } from "src/models/LectorDetails";
import { CreateLectorDetailsDto } from "src/models/dto/CreateLectorDetailsDto";

export interface ILectorDetailsRepository {
  createLectorDetails(details: CreateLectorDetailsDto): Promise<LectorDetails>
  updateLectorDetails(details: any): Promise<LectorDetails>
  deleteLectorDetails(id: number): Promise<void>
}

@Injectable()
export class LectorDetailsRepository implements ILectorDetailsRepository {
  constructor(
    @InjectRepository(LectorDetails)
    private readonly lectorDetailsRepository: Repository<LectorDetails>,
  ) { }

  async createLectorDetails(details: CreateLectorDetailsDto): Promise<LectorDetails> {
    return await this.lectorDetailsRepository.save(details)
  }

  async updateLectorDetails(details: any): Promise<LectorDetails> {
    return await this.lectorDetailsRepository.save(details)
  }

  async deleteLectorDetails(id: number): Promise<void> {
    await this.lectorDetailsRepository.delete(id)
  }
}
