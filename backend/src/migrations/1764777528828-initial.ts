import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcrypt from "bcrypt";

export class Initial1764777528828 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create enum types
    await queryRunner.query(`
      CREATE TYPE gender_enum AS ENUM ('male', 'female', 'other');
    `);

    await queryRunner.query(`
      CREATE TYPE category_enum AS ENUM ('meetup', 'party', 'sports', 'boardgames', 'walk_and_talk');
    `);

    await queryRunner.query(`
      CREATE TYPE approval_enum AS ENUM ('approved', 'rejected', 'pending');
    `);

    // Create users table
    await queryRunner.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        date_joined TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        age INTEGER NOT NULL,
        gender gender_enum NOT NULL,
        description TEXT,
        photos TEXT[] DEFAULT ARRAY[]::TEXT[],
        is_deleted BOOLEAN DEFAULT false,
        refresh_token TEXT
      );
    `);

    // Create events table
    await queryRunner.query(`
      CREATE TABLE events (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        start_date TIMESTAMP NOT NULL,
        finish_date TIMESTAMP,
        is_deleted BOOLEAN DEFAULT false,
        category category_enum NOT NULL
      );
    `);

    // Create users_of_event table
    await queryRunner.query(`
      CREATE TABLE users_of_event (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        event_id INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
        is_creator BOOLEAN DEFAULT false,
        is_approved BOOLEAN DEFAULT false,
        left_event BOOLEAN DEFAULT false,
        UNIQUE(user_id, event_id)
      );
    `);

    // Create approvals table
    await queryRunner.query(`
      CREATE TABLE approvals (
        id SERIAL PRIMARY KEY,
        approver_user_id INTEGER NOT NULL,
        target_user_id INTEGER NOT NULL,
        event_id INTEGER NOT NULL,
        status approval_enum DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(approver_user_id, target_user_id, event_id)
      );
    `);

    // Hash password for test users
    const hashedPassword = await bcrypt.hash("password123", 10);

    // Insert test users
    await queryRunner.query(`
      INSERT INTO users (first_name, last_name, email, password, age, gender, description, photos)
      VALUES 
        ('John', 'Doe', 'john.doe@example.com', '${hashedPassword}', 28, 'male', 'Software engineer and tech enthusiast', ARRAY[]::text[]),
        ('Jane', 'Smith', 'jane.smith@example.com', '${hashedPassword}', 25, 'female', 'Designer and creative thinker', ARRAY[]::text[]),
        ('Bob', 'Johnson', 'bob.johnson@example.com', '${hashedPassword}', 32, 'male', 'Product manager and strategist', ARRAY[]::text[]),
        ('Alice', 'Williams', 'alice.williams@example.com', '${hashedPassword}', 30, 'female', 'Marketing specialist', ARRAY[]::text[]),
        ('Charlie', 'Brown', 'charlie.brown@example.com', '${hashedPassword}', 27, 'male', 'Data scientist', ARRAY[]::text[])
    `);

    // Insert test events
    await queryRunner.query(`
      INSERT INTO events (name, start_date, finish_date, is_deleted, category)
      VALUES 
        ('Tech Meetup 2025', '2025-01-15 18:00:00', NULL, false, 'meetup'),
        ('React Workshop', '2025-01-20 14:00:00', NULL, false, 'party'),
        ('Startup Pitch Night', '2025-02-01 19:00:00', NULL, false, 'sports'),
        ('Coffee & Code', '2025-01-10 10:00:00', '2025-01-10 12:00:00', false, 'meetup'),
        ('Design Sprint', '2025-02-15 09:00:00', NULL, false, 'boardgames')
    `);

    // Insert test user-event relationships
    await queryRunner.query(`
      INSERT INTO users_of_event (user_id, event_id, is_creator, is_approved)
      VALUES 
        (1, 1, true, true),
        (2, 1, false, true),
        (3, 1, false, true),
        (1, 2, false, true),
        (2, 2, true, true),
        (4, 2, false, true),
        (3, 3, true, true),
        (5, 3, false, false),
        (1, 4, true, true),
        (4, 4, false, true),
        (2, 5, true, true),
        (5, 5, false, true)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop tables in reverse order due to foreign key constraints
    await queryRunner.query(`DROP TABLE IF EXISTS approvals CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS users_of_event CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS events CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS users CASCADE`);

    // Drop enum types
    await queryRunner.query(`DROP TYPE IF EXISTS approval_enum`);
    await queryRunner.query(`DROP TYPE IF EXISTS category_enum`);
    await queryRunner.query(`DROP TYPE IF EXISTS gender_enum`);
  }
}
