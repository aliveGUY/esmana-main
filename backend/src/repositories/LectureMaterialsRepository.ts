import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateLectureMaterialsDto } from "src/models/dto/CreateLectureMaterialsDto";
import { EditLectureMaterialsDto } from "src/models/dto/EditLectureMaterialsDto";
import { LectureMaterials } from "src/models/LectureMaterials";
import { Repository } from "typeorm";

export interface ILectureMaterialsRepository {
  createLectureMaterials(lectureMaterials: Partial<LectureMaterials>): Promise<LectureMaterials>
  editLectureMaterials(lectureMaterials: Partial<LectureMaterials>): Promise<LectureMaterials>
  deleteLectureMaterials(id: number): Promise<void>
}

@Injectable()
export class LectureMaterialsRepository implements ILectureMaterialsRepository {
  constructor(
    @InjectRepository(LectureMaterials)
    private readonly lectureMaterialsRepository: Repository<LectureMaterials>,
  ) { }

  async createLectureMaterials(lectureMaterials: Partial<LectureMaterials>): Promise<LectureMaterials> {
    return await this.lectureMaterialsRepository.save(lectureMaterials)
  }

  async editLectureMaterials(lectureMaterials: Partial<LectureMaterials>): Promise<LectureMaterials> {
    return await this.lectureMaterialsRepository.save(lectureMaterials)
  }

  async deleteLectureMaterials(id: number): Promise<void> {
    await this.lectureMaterialsRepository.delete({ id })
  }
}