import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1748689706447 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        length: "36",
                        isPrimary: true,
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "255",
                        isUnique: true,
                    },
                    {
                        name: "password",
                        type: "varchar",
                        length: "255",
                        isNullable: true,
                    },
                    {
                        name: "first_name",
                        type: "varchar",
                        length: "255",
                    },
                    {
                        name: "last_name",
                        type: "varchar",
                        length: "255",
                    },
                    {
                        name: "google_id",
                        type: "varchar",
                        length: "255",
                        isNullable: true,
                        isUnique: true,
                    },
                    {
                        name: "profile_picture",
                        type: "text",
                        isNullable: true,
                    },
                    {
                        name: "provider",
                        type: "enum",
                        enum: ["local", "google"],
                        default: "'local'",
                    },
                    {
                        name: "is_email_verified",
                        type: "boolean",
                        default: false,
                    },
                    {
                        name: "roles",
                        type: "json",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP",
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
