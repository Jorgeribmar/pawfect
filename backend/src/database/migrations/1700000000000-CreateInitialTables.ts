import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialTables1700000000000 implements MigrationInterface {
    name = 'CreateInitialTables1700000000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Users table
        await queryRunner.query(`
            CREATE TABLE users (
                id VARCHAR(36) NOT NULL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                avatar VARCHAR(255),
                bio TEXT,
                googleId VARCHAR(255),
                facebookId VARCHAR(255),
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        // Pets table
        await queryRunner.query(`
            CREATE TABLE pets (
                id VARCHAR(36) NOT NULL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                breed VARCHAR(255) NOT NULL,
                age INT NOT NULL,
                photo VARCHAR(255),
                userId VARCHAR(36),
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        // Posts table
        await queryRunner.query(`
            CREATE TABLE posts (
                id VARCHAR(36) NOT NULL PRIMARY KEY,
                content TEXT NOT NULL,
                images TEXT,
                userId VARCHAR(36),
                likesCount INT DEFAULT 0,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        // Comments table
        await queryRunner.query(`
            CREATE TABLE comments (
                id VARCHAR(36) NOT NULL PRIMARY KEY,
                content TEXT NOT NULL,
                userId VARCHAR(36),
                postId VARCHAR(36),
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE
            )
        `);

        // Post likes table (many-to-many relationship)
        await queryRunner.query(`
            CREATE TABLE post_likes (
                postId VARCHAR(36) NOT NULL,
                userId VARCHAR(36) NOT NULL,
                PRIMARY KEY (postId, userId),
                FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE,
                FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE post_likes`);
        await queryRunner.query(`DROP TABLE comments`);
        await queryRunner.query(`DROP TABLE posts`);
        await queryRunner.query(`DROP TABLE pets`);
        await queryRunner.query(`DROP TABLE users`);
    }
}