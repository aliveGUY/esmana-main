import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTables1739726621576 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "first_name", type: "varchar", length: "100", isNullable: false },
          { name: "middle_name", type: "varchar", length: "100", isNullable: true },
          { name: "last_name", type: "varchar", length: "100", isNullable: false },
          { name: "email", type: "varchar", length: "255", isNullable: false, isUnique: true },
          { name: "phone", type: "varchar", length: "20", isNullable: false },
          { name: "password", type: "varchar", length: "255", isNullable: false },
          { name: "role", type: "enum", enum: ["user", "admin", "owner"], default: "'user'" },
          { name: "created_at", type: "timestamp", default: "CURRENT_TIMESTAMP" },
          { name: "updated_at", type: "timestamp", default: "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" },
          { name: "identity_id", type: "int", isNullable: true, isUnique: true }
        ]
      })
    );

    await queryRunner.createTable(
      new Table({
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
          { name: "taxpayer_id", type: "varchar", isNullable: true },
          { name: "passport_id", type: "varchar", isNullable: true },
          { name: "passport_issues_by", type: "varchar", isNullable: true },
          { name: "education_institution", type: "varchar", isNullable: true },
          { name: "work_experience", type: "varchar", isNullable: true },
          { name: "relevant_topics", type: "varchar", isNullable: true },
          { name: "user_id", type: "int", isNullable: false, isUnique: true },
          { name: "created_at", type: "timestamp", default: "CURRENT_TIMESTAMP" },
          { name: "updated_at", type: "timestamp", default: "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" }
        ]
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "course",
        columns: [
          { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "title", type: "varchar", length: "255", isNullable: false },
          { name: "beginning_date", type: "timestamp", isNullable: false },
          { name: "finish_date", type: "timestamp", isNullable: true },
          { name: "availability_time", type: "timestamp", isNullable: false },
          { name: "active", type: "boolean", isNullable: false, default: false },
          { name: "certificate", type: "varchar", length: "500", isNullable: false },
          { name: "created_at", type: "timestamp", precision: 6, default: "CURRENT_TIMESTAMP(6)" },
          { name: "updated_at", type: "timestamp", precision: 6, default: "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" }
        ]
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "lecture",
        columns: [
          { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "title", type: "varchar", length: "255", isNullable: false },
          { name: "start_time", type: "datetime", isNullable: false },
          { name: "end_time", type: "datetime", isNullable: false },
          { name: "video_link", type: "varchar", length: "500", isNullable: true },
          { name: "course_id", type: "int", isNullable: false },
          { name: "temp_lecture_resources_id", type: "int", isNullable: true },
          { name: "created_at", type: "timestamp", precision: 6, default: "CURRENT_TIMESTAMP(6)" },
          { name: "updated_at", type: "timestamp", precision: 6, default: "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" }
        ]
      })
    );
    await queryRunner.createTable(
      new Table({
        name: "temp_lecture_resources",
        columns: [
          { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "lecture_id", type: "int", isNullable: false, isUnique: true },
          { name: "video_call_link", type: "varchar", length: "500", isNullable: false }
        ]
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "notification",
        columns: [
          { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "user_id", type: "int", isNullable: true },
          { name: "course_id", type: "int", isNullable: true },
          { name: "membership_id", type: "int", isNullable: true },
          { name: "seen", type: "boolean", isNullable: false, default: false },
          { name: "severity", type: "enum", enum: ["success", "warning", "error", "info"], default: "'error'" },
          { name: "type", type: "enum", enum: ["unknown", "pending_course_purchase", "pending_membership_purchase", "membership_will_expire", "membership_is_expired"], default: "'unknown'" },
          { name: "created_at", type: "timestamp", precision: 6, default: "CURRENT_TIMESTAMP(6)" }
        ]
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "membership",
        columns: [
          { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "user_id", type: "int", isNullable: true },
          { name: "payment_date", type: "date", isNullable: true },
          { name: "activation_date", type: "date", isNullable: true },
          { name: "expires_at", type: "date", isNullable: true },
          { name: "created_at", type: "timestamp", precision: 6, default: "CURRENT_TIMESTAMP(6)" }
        ]
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "course_students",
        columns: [
          { name: "course_id", type: "int", isPrimary: true },
          { name: "student_id", type: "int", isPrimary: true }
        ]
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "lecture_speakers",
        columns: [
          { name: "lecture_id", type: "int", isPrimary: true },
          { name: "speaker_id", type: "int", isPrimary: true }
        ]
      })
    );

    await queryRunner.createForeignKey(
      "identity",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "user",
        onDelete: "CASCADE"
      })
    );

    await queryRunner.createForeignKey(
      "course_students",
      new TableForeignKey({
        columnNames: ["course_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "course",
        onDelete: "CASCADE"
      })
    );

    await queryRunner.createForeignKey(
      "course_students",
      new TableForeignKey({
        columnNames: ["student_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "user",
        onDelete: "CASCADE"
      })
    );

    await queryRunner.createForeignKey(
      "lecture",
      new TableForeignKey({
        columnNames: ["course_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "course",
        onDelete: "CASCADE"
      })
    );

    await queryRunner.createForeignKey(
      "lecture",
      new TableForeignKey({
        columnNames: ["temp_lecture_resources_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "temp_lecture_resources",
        onDelete: "CASCADE"
      })
    );

    await queryRunner.createForeignKey(
      "lecture_speakers",
      new TableForeignKey({
        columnNames: ["lecture_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "lecture",
        onDelete: "CASCADE"
      })
    );

    await queryRunner.createForeignKey(
      "lecture_speakers",
      new TableForeignKey({
        columnNames: ["speaker_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "user",
        onDelete: "CASCADE"
      })
    );

    await queryRunner.createForeignKey(
      "temp_lecture_resources",
      new TableForeignKey({
        columnNames: ["lecture_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "lecture",
        onDelete: "CASCADE"
      })
    );

    await queryRunner.createForeignKey(
      "notification",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "user",
        onDelete: "CASCADE"
      })
    );

    await queryRunner.createForeignKey(
      "notification",
      new TableForeignKey({
        columnNames: ["course_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "course",
        onDelete: "CASCADE"
      })
    );

    await queryRunner.createForeignKey(
      "notification",
      new TableForeignKey({
        columnNames: ["membership_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "membership",
        onDelete: "CASCADE"
      })
    );

    await queryRunner.createForeignKey(
      "membership",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "user",
        onDelete: "SET NULL"
      })
    );

    await queryRunner.createForeignKey(
      "user",
      new TableForeignKey({
        columnNames: ["identity_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "identity",
        onDelete: "SET NULL"
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("identity", "FK_identity_user_id");
    await queryRunner.dropForeignKey("course_students", "FK_course_students_course_id");
    await queryRunner.dropForeignKey("course_students", "FK_course_students_student_id");
    await queryRunner.dropForeignKey("lecture", "FK_lecture_course_id");
    await queryRunner.dropForeignKey("lecture", "FK_lecture_temp_lecture_resources_id");
    await queryRunner.dropForeignKey("lecture_speakers", "FK_lecture_speakers_lecture_id");
    await queryRunner.dropForeignKey("lecture_speakers", "FK_lecture_speakers_speaker_id");
    await queryRunner.dropForeignKey("temp_lecture_resources", "FK_temp_lecture_resources_lecture_id");
    await queryRunner.dropForeignKey("notification", "FK_notification_user_id");
    await queryRunner.dropForeignKey("notification", "FK_notification_course_id");
    await queryRunner.dropForeignKey("notification", "FK_notification_membership_id");
    await queryRunner.dropForeignKey("membership", "FK_membership_user_id");
    await queryRunner.dropTable("lecture_speakers");
    await queryRunner.dropTable("course_students");
    await queryRunner.dropTable("membership");
    await queryRunner.dropTable("notification");
    await queryRunner.dropTable("temp_lecture_resources");
    await queryRunner.dropTable("lecture");
    await queryRunner.dropTable("course");
    await queryRunner.dropTable("identity");
    await queryRunner.dropTable("user");
  }
}
