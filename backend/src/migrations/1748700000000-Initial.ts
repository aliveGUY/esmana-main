import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1748700000000 implements MigrationInterface {
    name = 'Initial1748700000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create users table
        await queryRunner.query(`
            CREATE TABLE users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                first_name VARCHAR(255) NOT NULL,
                middle_name VARCHAR(255),
                last_name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                phone VARCHAR(20),
                password VARCHAR(255),
                google_id VARCHAR(255) UNIQUE,
                profile_picture VARCHAR(2048),
                is_email_verified TINYINT(1) DEFAULT 0,
                roles JSON NOT NULL
            )
        `);

        // Create lector_details table
        await queryRunner.query(`
            CREATE TABLE lector_details (
                id INT AUTO_INCREMENT PRIMARY KEY,
                credentials VARCHAR(2048),
                biography JSON,
                user_id INT UNIQUE NOT NULL,
                CONSTRAINT FK_lector_details_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        // Create course table
        await queryRunner.query(`
            CREATE TABLE course (
                id INT AUTO_INCREMENT PRIMARY KEY,
                thumbnail_url VARCHAR(2048),
                title VARCHAR(255) NOT NULL,
                description LONGTEXT NOT NULL,
                is_active TINYINT(1) DEFAULT 0,
                participation_certificate VARCHAR(2048),
                bpr_certificate VARCHAR(2048),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        // Create lecture table
        await queryRunner.query(`
            CREATE TABLE lecture (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description LONGTEXT NOT NULL,
                price DECIMAL(10,2) NOT NULL,
                start_time TIMESTAMP NOT NULL,
                end_time TIMESTAMP NOT NULL,
                course_id INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                CONSTRAINT FK_lecture_course_id FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE
            )
        `);

        // Create lecture_materials table
        await queryRunner.query(`
            CREATE TABLE lecture_materials (
                id INT AUTO_INCREMENT PRIMARY KEY,
                video_url VARCHAR(2048),
                meeting_url VARCHAR(2048),
                rich_text JSON,
                lecture_id INT UNIQUE NOT NULL,
                CONSTRAINT FK_lecture_materials_lecture_id FOREIGN KEY (lecture_id) REFERENCES lecture(id) ON DELETE CASCADE
            )
        `);

        // Create evaluation_question table
        await queryRunner.query(`
            CREATE TABLE evaluation_question (
                id INT AUTO_INCREMENT PRIMARY KEY,
                question_text VARCHAR(1000) NOT NULL,
                correct_answers JSON NOT NULL,
                options JSON NOT NULL,
                materials_id INT,
                course_id INT,
                CONSTRAINT FK_evaluation_question_materials_id FOREIGN KEY (materials_id) REFERENCES lecture_materials(id) ON DELETE CASCADE,
                CONSTRAINT FK_evaluation_question_course_id FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE
            )
        `);

        // Create user_lecture table (many-to-many relationship)
        await queryRunner.query(`
            CREATE TABLE user_lecture (
                user_id INT NOT NULL,
                lecture_id INT NOT NULL,
                is_completed TINYINT(1) DEFAULT 0,
                is_lector TINYINT(1) DEFAULT 0,
                is_got_academic_hours TINYINT(1) DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop indexes
        await queryRunner.query(`DROP INDEX IDX_user_lecture_is_completed ON user_lecture`);
        await queryRunner.query(`DROP INDEX IDX_user_lecture_is_lector ON user_lecture`);
        await queryRunner.query(`DROP INDEX IDX_user_lecture_lecture_id ON user_lecture`);
        await queryRunner.query(`DROP INDEX IDX_user_lecture_user_id ON user_lecture`);
        await queryRunner.query(`DROP INDEX IDX_evaluation_question_course_id ON evaluation_question`);
        await queryRunner.query(`DROP INDEX IDX_evaluation_question_materials_id ON evaluation_question`);
        await queryRunner.query(`DROP INDEX IDX_lecture_materials_lecture_id ON lecture_materials`);
        await queryRunner.query(`DROP INDEX IDX_lecture_end_time ON lecture`);
        await queryRunner.query(`DROP INDEX IDX_lecture_start_time ON lecture`);
        await queryRunner.query(`DROP INDEX IDX_lecture_course_id ON lecture`);
        await queryRunner.query(`DROP INDEX IDX_course_created_at ON course`);
        await queryRunner.query(`DROP INDEX IDX_course_is_active ON course`);
        await queryRunner.query(`DROP INDEX IDX_lector_details_user_id ON lector_details`);
        await queryRunner.query(`DROP INDEX IDX_users_google_id ON users`);
        await queryRunner.query(`DROP INDEX IDX_users_email ON users`);

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
