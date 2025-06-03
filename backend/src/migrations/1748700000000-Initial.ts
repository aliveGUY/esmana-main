import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1748700000000 implements MigrationInterface {
    name = 'Initial1748700000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create users table
        await queryRunner.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                first_name VARCHAR NOT NULL,
                middle_name VARCHAR,
                last_name VARCHAR NOT NULL,
                email VARCHAR UNIQUE NOT NULL,
                phone VARCHAR,
                password VARCHAR,
                google_id VARCHAR UNIQUE,
                profile_picture VARCHAR,
                is_email_verified BOOLEAN DEFAULT false,
                roles JSON NOT NULL
            )
        `);

        // Create lector_details table
        await queryRunner.query(`
            CREATE TABLE lector_details (
                id SERIAL PRIMARY KEY,
                credentials VARCHAR(2048),
                biography JSON,
                user_id INTEGER UNIQUE NOT NULL,
                CONSTRAINT FK_lector_details_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        // Create course table
        await queryRunner.query(`
            CREATE TABLE course (
                id SERIAL PRIMARY KEY,
                thumbnail_url VARCHAR(2048),
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                is_active BOOLEAN DEFAULT false,
                participation_certificate VARCHAR(2048),
                bpr_certificate VARCHAR(2048),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Create lecture table
        await queryRunner.query(`
            CREATE TABLE lecture (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                price DECIMAL(10,2) NOT NULL,
                start_time TIMESTAMP NOT NULL,
                end_time TIMESTAMP NOT NULL,
                course_id INTEGER NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT FK_lecture_course_id FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE
            )
        `);

        // Create lecture_materials table
        await queryRunner.query(`
            CREATE TABLE lecture_materials (
                id SERIAL PRIMARY KEY,
                video_url VARCHAR(2048),
                meeting_url VARCHAR(2048),
                rich_text JSON,
                lecture_id INTEGER UNIQUE NOT NULL,
                CONSTRAINT FK_lecture_materials_lecture_id FOREIGN KEY (lecture_id) REFERENCES lecture(id) ON DELETE CASCADE
            )
        `);

        // Create evaluation_question table
        await queryRunner.query(`
            CREATE TABLE evaluation_question (
                id SERIAL PRIMARY KEY,
                question_text VARCHAR(1000) NOT NULL,
                correct_answers JSON NOT NULL,
                options JSON NOT NULL,
                materials_id INTEGER,
                course_id INTEGER,
                CONSTRAINT FK_evaluation_question_materials_id FOREIGN KEY (materials_id) REFERENCES lecture_materials(id) ON DELETE CASCADE,
                CONSTRAINT FK_evaluation_question_course_id FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE
            )
        `);

        // Create user_lecture table (many-to-many relationship)
        await queryRunner.query(`
            CREATE TABLE user_lecture (
                user_id INTEGER NOT NULL,
                lecture_id INTEGER NOT NULL,
                is_completed BOOLEAN DEFAULT false,
                is_lector BOOLEAN DEFAULT false,
                is_got_academic_hours BOOLEAN DEFAULT false,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (user_id, lecture_id),
                CONSTRAINT FK_user_lecture_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                CONSTRAINT FK_user_lecture_lecture_id FOREIGN KEY (lecture_id) REFERENCES lecture(id) ON DELETE CASCADE
            )
        `);

        // Create indexes for better performance
        await queryRunner.query(`CREATE INDEX IDX_users_email ON users (email)`);
        await queryRunner.query(`CREATE INDEX IDX_users_google_id ON users (google_id)`);
        await queryRunner.query(`CREATE INDEX IDX_lector_details_user_id ON lector_details (user_id)`);
        await queryRunner.query(`CREATE INDEX IDX_course_is_active ON course (is_active)`);
        await queryRunner.query(`CREATE INDEX IDX_course_created_at ON course (created_at)`);
        await queryRunner.query(`CREATE INDEX IDX_lecture_course_id ON lecture (course_id)`);
        await queryRunner.query(`CREATE INDEX IDX_lecture_start_time ON lecture (start_time)`);
        await queryRunner.query(`CREATE INDEX IDX_lecture_end_time ON lecture (end_time)`);
        await queryRunner.query(`CREATE INDEX IDX_lecture_materials_lecture_id ON lecture_materials (lecture_id)`);
        await queryRunner.query(`CREATE INDEX IDX_evaluation_question_materials_id ON evaluation_question (materials_id)`);
        await queryRunner.query(`CREATE INDEX IDX_evaluation_question_course_id ON evaluation_question (course_id)`);
        await queryRunner.query(`CREATE INDEX IDX_user_lecture_user_id ON user_lecture (user_id)`);
        await queryRunner.query(`CREATE INDEX IDX_user_lecture_lecture_id ON user_lecture (lecture_id)`);
        await queryRunner.query(`CREATE INDEX IDX_user_lecture_is_lector ON user_lecture (is_lector)`);
        await queryRunner.query(`CREATE INDEX IDX_user_lecture_is_completed ON user_lecture (is_completed)`);

        // Create triggers for automatic updated_at timestamp updates
        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION update_updated_at_column()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW.updated_at = CURRENT_TIMESTAMP;
                RETURN NEW;
            END;
            $$ language 'plpgsql'
        `);

        await queryRunner.query(`
            CREATE TRIGGER update_course_updated_at 
            BEFORE UPDATE ON course 
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()
        `);

        await queryRunner.query(`
            CREATE TRIGGER update_lecture_updated_at 
            BEFORE UPDATE ON lecture 
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()
        `);

        await queryRunner.query(`
            CREATE TRIGGER update_user_lecture_updated_at 
            BEFORE UPDATE ON user_lecture 
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop triggers
        await queryRunner.query(`DROP TRIGGER IF EXISTS update_user_lecture_updated_at ON user_lecture`);
        await queryRunner.query(`DROP TRIGGER IF EXISTS update_lecture_updated_at ON lecture`);
        await queryRunner.query(`DROP TRIGGER IF EXISTS update_course_updated_at ON course`);
        await queryRunner.query(`DROP FUNCTION IF EXISTS update_updated_at_column()`);

        // Drop indexes
        await queryRunner.query(`DROP INDEX IF EXISTS IDX_user_lecture_is_completed`);
        await queryRunner.query(`DROP INDEX IF EXISTS IDX_user_lecture_is_lector`);
        await queryRunner.query(`DROP INDEX IF EXISTS IDX_user_lecture_lecture_id`);
        await queryRunner.query(`DROP INDEX IF EXISTS IDX_user_lecture_user_id`);
        await queryRunner.query(`DROP INDEX IF EXISTS IDX_evaluation_question_course_id`);
        await queryRunner.query(`DROP INDEX IF EXISTS IDX_evaluation_question_materials_id`);
        await queryRunner.query(`DROP INDEX IF EXISTS IDX_lecture_materials_lecture_id`);
        await queryRunner.query(`DROP INDEX IF EXISTS IDX_lecture_end_time`);
        await queryRunner.query(`DROP INDEX IF EXISTS IDX_lecture_start_time`);
        await queryRunner.query(`DROP INDEX IF EXISTS IDX_lecture_course_id`);
        await queryRunner.query(`DROP INDEX IF EXISTS IDX_course_created_at`);
        await queryRunner.query(`DROP INDEX IF EXISTS IDX_course_is_active`);
        await queryRunner.query(`DROP INDEX IF EXISTS IDX_lector_details_user_id`);
        await queryRunner.query(`DROP INDEX IF EXISTS IDX_users_google_id`);
        await queryRunner.query(`DROP INDEX IF EXISTS IDX_users_email`);

        // Drop tables in reverse order (respecting foreign key dependencies)
        await queryRunner.query(`DROP TABLE IF EXISTS user_lecture`);
        await queryRunner.query(`DROP TABLE IF EXISTS evaluation_question`);
        await queryRunner.query(`DROP TABLE IF EXISTS lecture_materials`);
        await queryRunner.query(`DROP TABLE IF EXISTS lecture`);
        await queryRunner.query(`DROP TABLE IF EXISTS course`);
        await queryRunner.query(`DROP TABLE IF EXISTS lector_details`);
        await queryRunner.query(`DROP TABLE IF EXISTS users`);
    }
}
