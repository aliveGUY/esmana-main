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
                        name: "first_name",
                        type: "varchar",
                        length: "255",
                    },
                    {
                        name: "middle_name",
                        type: "varchar",
                        length: "255",
                        isNullable: true,
                    },
                    {
                        name: "last_name",
                        type: "varchar",
                        length: "255",
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
                        name: "is_email_verified",
                        type: "boolean",
                        default: false,
                    },
                    {
                        name: "roles",
                        type: "json",
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
