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
  import { PostsService } from './posts.service';
  import { CreatePostDto } from './dto/create-post.dto';
  import { UpdatePostDto } from './dto/update-post.dto';
  import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
  import { Post as PostEntity } from './entities/post.entity';
  import { AuthenticatedRequest } from '../types/request';
  
  @ApiTags('posts')
  @Controller('posts')
  export class PostsController {
    constructor(private readonly postsService: PostsService) {}
  
    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new post' })
    @ApiResponse({ status: 201, type: PostEntity })
    create(@Request() req: AuthenticatedRequest, @Body() createPostDto: CreatePostDto) {
      return this.postsService.create(req.user.id, createPostDto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Get all posts' })
    @ApiResponse({ status: 200, type: [PostEntity] })
    findAll() {
      return this.postsService.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get post by ID' })
    @ApiResponse({ status: 200, type: PostEntity })
    findOne(@Param('id') id: string) {
      return this.postsService.findOne(id);
    }
  
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update post' })
    @ApiResponse({ status: 200, type: PostEntity })
    update(
      @Param('id') id: string,
      @Request() req: AuthenticatedRequest,
      @Body() updatePostDto: UpdatePostDto,
    ) {
      return this.postsService.update(id, req.user.id, updatePostDto);
    }
  
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete post' })
    @ApiResponse({ status: 200 })
    remove(@Param('id') id: string, @Request() req: AuthenticatedRequest) {
      return this.postsService.remove(id, req.user.id);
    }
  
    @UseGuards(JwtAuthGuard)
    @Post(':id/like')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Toggle like on post' })
    @ApiResponse({ status: 200, type: PostEntity })
    toggleLike(@Param('id') id: string, @Request() req: AuthenticatedRequest) {
      return this.postsService.toggleLike(id, req.user.id);
    }
  }