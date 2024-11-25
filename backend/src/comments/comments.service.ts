import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PostsService } from '../posts/posts.service';
import { WebsocketGateway } from '../websocket/websocket.gateway';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    private postsService: PostsService,
    private websocketGateway: WebsocketGateway,
  ) {}

  async create(userId: string, postId: string, createCommentDto: CreateCommentDto): Promise<Comment> {
    const post = await this.postsService.findOne(postId);
    const comment = this.commentsRepository.create({
      ...createCommentDto,
      user: { id: userId },
      post: { id: postId },
    });
    const savedComment = await this.commentsRepository.save(comment);

    // Notify post owner about new comment
    await this.websocketGateway.notifyNewComment(post.user.id, savedComment);

    return savedComment;
  }

  async findAll(postId: string): Promise<Comment[]> {
    return this.commentsRepository.find({
      where: { post: { id: postId } },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Comment> {
    const comment = await this.commentsRepository.findOne({
      where: { id },
      relations: ['user', 'post'],
    });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }

  async update(id: string, userId: string, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const comment = await this.findOne(id);
    if (comment.user.id !== userId) {
      throw new NotFoundException('Comment not found');
    }
    Object.assign(comment, updateCommentDto);
    return this.commentsRepository.save(comment);
  }

  async remove(id: string, userId: string): Promise<void> {
    const comment = await this.findOne(id);
    if (comment.user.id !== userId) {
      throw new NotFoundException('Comment not found');
    }
    await this.commentsRepository.remove(comment);
  }
}