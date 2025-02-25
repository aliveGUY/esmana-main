import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { isEqual } from "lodash";
import { CreateMemberIdentityDto } from "src/models/dto/CreateMemberIdentityDto";
import { CreateStudentIdentityDto } from "src/models/dto/CreateStudentIdentityDto";
import { Identity } from "src/models/Identity";
import { EntityMetadata, Repository, DataSource } from "typeorm";

@Injectable()
export class IdentityRepository {
  constructor(
    @InjectRepository(Identity) private readonly identity: Repository<Identity>,
    private readonly dataSource: DataSource
  ) { }

  createStudentIdentity(identity: CreateStudentIdentityDto): Promise<Identity> {
    return this.identity.save(identity)
  }

  createMemberIdentity(identity: CreateMemberIdentityDto): Promise<Identity> {
    return this.identity.save(identity)
  }

  async extendStudentToMember(userId: number, identity: Partial<Identity>): Promise<void> {
    const existingIdentity = await this.identity.findOne({ where: { user: { id: userId } } });

    if (!existingIdentity) {
      throw new Error(`Identity not found for user ID: ${userId}`);
    }

    await this.identity.update({ user: { id: userId } }, identity);
  }

  async isIdentityComplete(userId: number): Promise<boolean> {
    const metadata: EntityMetadata = this.dataSource.getMetadata(Identity);

    const nullableColumns = metadata.columns
      .filter(col => col.isNullable)
      .map(col => `${col.databaseName} IS NULL`);

    if (nullableColumns.length === 0) return true;

    const query = `
    SELECT CASE 
      WHEN ${nullableColumns.join(" OR ")}
      THEN FALSE 
      ELSE TRUE 
    END AS is_complete
    FROM identity
    WHERE user_id = ?
  `;

    const result = await this.dataSource.query(query, [Number(userId)]);

    return isEqual(result[0]?.is_complete, '1');
  }
}