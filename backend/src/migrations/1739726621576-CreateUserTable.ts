import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTables1739726621576 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // User Table
    await queryRunner.createTable(new Table({
      name: "user",
      columns: [
        { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
        { name: "first_name", type: "varchar", length: "100", isNullable: false },
        { name: "middle_name", type: "varchar", length: "100", isNullable: true },
        { name: "last_name", type: "varchar", length: "100", isNullable: false },
        { name: "email", type: "varchar", length: "255", isNullable: false, isUnique: true },
        { name: "phone", type: "varchar", length: "20", isNullable: false },
        { name: "password", type: "varchar", length: "255", isNullable: false },
        { name: "role", type: "enum", enum: ["USER", "ADMIN"], default: "'USER'" },
        { name: "created_at", type: "timestamp", default: "CURRENT_TIMESTAMP" },
        { name: "updated_at", type: "timestamp", default: "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" },
      ],
    }));

    // Identity Table
    await queryRunner.createTable(new Table({
      name: "identity",
      columns: [
        { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
        { name: "city", type: "varchar", isNullable: false },
        { name: "birth_date", type: "date", isNullable: false },
        { name: "workplace", type: "varchar", length: "255", isNullable: false },
        { name: "position", type: "varchar", length: "255", isNullable: false },
        { name: "education", type: "json", isNullable: false },
        { name: "field_of_work", type: "varchar", length: "255", isNullable: false },
        { name: "diploma_number", type: "varchar", length: "50", isNullable: false },
        { name: "personal_data_collection_consent", type: "boolean", default: true },
        { name: "residence_address", type: "varchar", isNullable: true },
        { name: "country", type: "varchar", isNullable: true },
        { name: "region", type: "varchar", isNullable: true },
        { name: "taxpayer_id", type: "varchar", isNullable: true, isUnique: true },
        { name: "passport_id", type: "varchar", isNullable: true, isUnique: true },
        { name: "passport_issues_by", type: "varchar", isNullable: true },
        { name: "education_institution", type: "varchar", isNullable: true },
        { name: "work_experience", type: "varchar", isNullable: true },
        { name: "relevant_topics", type: "varchar", isNullable: true },
        { name: "user_id", type: "int", isNullable: false, isUnique: true },
        { name: "created_at", type: "timestamp", default: "CURRENT_TIMESTAMP" },
        { name: "updated_at", type: "timestamp", default: "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" },
      ],
    }));

    await queryRunner.createForeignKey("identity", new TableForeignKey({
      columnNames: ["user_id"],
      referencedColumnNames: ["id"],
      referencedTableName: "user",
      onDelete: "CASCADE",
    }));

    // Course Table
    await queryRunner.createTable(new Table({
      name: "course",
      columns: [
        { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
        { name: "title", type: "varchar", length: "255", isNullable: false },
        { name: "beginning_date", type: "timestamp", isNullable: false },
        { name: "finish_date", type: "timestamp", isNullable: false },
        { name: "availability_time", type: "timestamp", isNullable: false },
        { name: "certificate", type: "varchar", length: "500", isNullable: true },
        { name: "created_at", type: "timestamp", default: "CURRENT_TIMESTAMP" },
        { name: "updated_at", type: "timestamp", default: "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" },
      ],
    }));

    // Lecture Table
    await queryRunner.createTable(new Table({
      name: "lecture",
      columns: [
        { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
        { name: "title", type: "varchar", length: "255", isNullable: false },
        { name: "start_time", type: "datetime", isNullable: false },
        { name: "end_time", type: "datetime", isNullable: false },
        { name: "duration", type: "time", isNullable: false },
        { name: "video_link", type: "varchar", length: "500", isNullable: true },
        { name: "course_id", type: "int", isNullable: false },
        { name: "created_at", type: "timestamp", default: "CURRENT_TIMESTAMP" },
        { name: "updated_at", type: "timestamp", default: "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" },
      ],
    }));

    await queryRunner.createForeignKey("lecture", new TableForeignKey({
      columnNames: ["course_id"],
      referencedColumnNames: ["id"],
      referencedTableName: "course",
      onDelete: "CASCADE",
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("lecture");
    await queryRunner.dropTable("course");
    await queryRunner.dropTable("identity");
    await queryRunner.dropTable("user");
  }
}
