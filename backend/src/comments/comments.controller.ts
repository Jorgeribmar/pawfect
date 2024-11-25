import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Request,
  } from '@nestjs/common';
  import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
  import { CommentsService } from './comments.service';
  import { CreateCommentDto } from './dto/create-comment.dto';
  import { UpdateCommentDto } from './dto/update-comment.dto';
  import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
  import { Comment } from './entities/comment.entity';
  import { AuthenticatedRequest } from '../types/request';
  
  @ApiTags('comments')
  @Controller('posts/:postId/comments')
  export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}
  
    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new comment' })
    @ApiResponse({ status: 201, type: Comment })
    create(
      @Request() req: AuthenticatedRequest,
      @Param('postId') postId: string,
      @Body() createCommentDto: CreateCommentDto,
    ) {
      return this.commentsService.create(req.user.id, postId, createCommentDto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Get all comments for a post' })
    @ApiResponse({ status: 200, type: [Comment] })
    findAll(@Param('postId') postId: string) {
      return this.commentsService.findAll(postId);
    }
  
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update comment' })
    @ApiResponse({ status: 200, type: Comment })
    update(
      @Param('id') id: string,
      @Request() req: AuthenticatedRequest,
      @Body() updateCommentDto: UpdateCommentDto,
    ) {
      return this.commentsService.update(id, req.user.id, updateCommentDto);
    }
  
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete comment' })
    @ApiResponse({ status: 200 })
    remove(@Param('id') id: string, @Request() req: AuthenticatedRequest) {
      return this.commentsService.remove(id, req.user.id);
    }
  }