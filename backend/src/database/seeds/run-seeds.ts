import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import dataSource from '../../config/typeorm.config';
import { userSeeds } from './user.seed';
import { petSeeds } from './pet.seed';
import { postSeeds } from './post.seed';
import { User } from '../../users/entities/user.entity';
import { Pet } from '../../users/entities/pet.entity';
import { Post } from '../../posts/entities/post.entity';

async function runSeeds() {
  try {
    const connection = await dataSource.initialize();

    // Clear existing data
    await connection.query('SET FOREIGN_KEY_CHECKS = 0');
    await connection.query('TRUNCATE TABLE users');
    await connection.query('TRUNCATE TABLE pets');
    await connection.query('TRUNCATE TABLE posts');
    await connection.query('TRUNCATE TABLE comments');
    await connection.query('TRUNCATE TABLE post_likes');
    await connection.query('SET FOREIGN_KEY_CHECKS = 1');

    // Seed users
    const users: User[] = [];
    for (const seedUser of userSeeds) {
      const hashedPassword = await bcrypt.hash(seedUser.password, 10);
      const user = await connection
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          ...seedUser,
          password: hashedPassword,
        })
        .execute();
      users.push(user.raw[0]);
    }

    // Seed pets
    for (const seedPet of petSeeds) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      await connection
        .createQueryBuilder()
        .insert()
        .into(Pet)
        .values({
          ...seedPet,
          user: { id: randomUser.id },
        })
        .execute();
    }

    // Seed posts
    for (const seedPost of postSeeds) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      await connection
        .createQueryBuilder()
        .insert()
        .into(Post)
        .values({
          ...seedPost,
          user: { id: randomUser.id },
        })
        .execute();
    }

    await connection.destroy();
    console.log('Seeds completed successfully');
  } catch (error) {
    console.error('Error running seeds:', error);
    process.exit(1);
  }
}

runSeeds();