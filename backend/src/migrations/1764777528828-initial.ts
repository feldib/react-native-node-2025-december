import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcrypt from "bcrypt";

export class Initial1764777528828 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Hash password for test users
    const hashedPassword = await bcrypt.hash("password123", 10);

    // Insert categories
    // 0 - Meetup
    // 1 - Party
    // 2 - Sports
    // 3 - Boardgames
    // 4 - Walk and Talk
    await queryRunner.query(`
      INSERT INTO categories (name)
      VALUES 
        ('Meetup'),
        ('Party'),
        ('Sports'),
        ('Boardgames'),
        ('Walk and Talk')
    `);

    // Insert test users
    await queryRunner.query(`
      INSERT INTO users (first_name, last_name, password, age, gender, description, photos)
      VALUES 
        ('John', 'Doe', '${hashedPassword}', 28, 'male', 'Software engineer and tech enthusiast', ARRAY[]::text[]),
        ('Jane', 'Smith', '${hashedPassword}', 25, 'female', 'Designer and creative thinker', ARRAY[]::text[]),
        ('Bob', 'Johnson', '${hashedPassword}', 32, 'male', 'Product manager and strategist', ARRAY[]::text[]),
        ('Alice', 'Williams', '${hashedPassword}', 30, 'female', 'Marketing specialist', ARRAY[]::text[]),
        ('Charlie', 'Brown', '${hashedPassword}', 27, 'male', 'Data scientist', ARRAY[]::text[])
    `);

    // Insert test events
    await queryRunner.query(`
      INSERT INTO events (name, start_date, finish_date, is_deleted, category_id)
      VALUES 
        ('Tech Meetup 2025', '2025-01-15 18:00:00', NULL, false, 1),
        ('React Workshop', '2025-01-20 14:00:00', NULL, false, 2),
        ('Startup Pitch Night', '2025-02-01 19:00:00', NULL, false, 3),
        ('Coffee & Code', '2025-01-10 10:00:00', '2025-01-10 12:00:00', false, 1),
        ('Design Sprint', '2025-02-15 09:00:00', NULL, false, 2)
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
    // Delete in reverse order due to foreign key constraints
    await queryRunner.query(`DELETE FROM users_of_event`);
    await queryRunner.query(`DELETE FROM events`);
    await queryRunner.query(`DELETE FROM users`);
  }
}
