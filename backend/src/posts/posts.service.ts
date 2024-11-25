import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { WebsocketGateway } from '../websocket/websocket.gateway';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    private websocketGateway: WebsocketGateway,
  ) {}

  async create(userId: string, createPostDto: CreatePostDto): Promise<Post> {
    const post = this.postsRepository.create({
      ...createPostDto,
      user: { id: userId },
    });
    const savedPost = await this.postsRepository.save(post);
    
    // Notify all users about new post
    await this.websocketGateway.notifyNewPost(userId, savedPost);
    
    return savedPost;
  }

  async findAll(): Promise<Post[]> {
    return this.postsRepository.find({
      relations: ['user', 'comments', 'comments.user', 'likes'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['user', 'comments', 'comments.user', 'likes'],
    });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async update(id: string, userId: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.findOne(id);
    if (post.user.id !== userId) {
      throw new NotFoundException('Post not found');
    }
    Object.assign(post, updatePostDto);
    return this.postsRepository.save(post);
  }

  async remove(id: string, userId: string): Promise<void> {
    const post = await this.findOne(id);
    if (post.user.id !== userId) {
      throw new NotFoundException('Post not found');
    }
    await this.postsRepository.remove(post);
  }

  async toggleLike(postId: string, userId: string): Promise<Post> {
    const post = await this.findOne(postId);
    const userLikeIndex = post.likes.findIndex(user => user.id === userId);

    if (userLikeIndex > -1) {
      post.likes = post.likes.filter(user => user.id !== userId);
      post.likesCount--;
    } else {
      post.likes.push({ id: userId } as any);
      post.likesCount++;
      
      // Notify post owner about new like
      await this.websocketGateway.notifyNewLike(post.user.id, {
        postId,
        userId,
      });
    }

    return this.postsRepository.save(post);
  }
}