import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PostService } from './post.service';
import { PostDto } from './dto/post.dto';
import { PostCreateDto } from './dto/post.create.dto';
import { ApiOkArrayResponse } from '../common/swagger.utils';
import { ArrayResponse, mapToArrayResponse } from '../common/array.response';
import { PostUpdateDto } from './dto/post.update.dto';
import { CommentService } from '../comment/comment.service';
import { CommentDto } from '../comment/dto/comment.dto';
import { CommentCreateDto } from '../comment/dto/comment.create.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { RightGuardPost } from '../auth/guard/right.guard.post';

@ApiBearerAuth('JWT-auth')
@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(
    private readonly postService: PostService,
    private readonly commentService: CommentService,
  ) {}

  @ApiOperation({ summary: 'Get all posts' })
  @ApiOkArrayResponse(PostDto)
  @Get()
  @UseGuards(AuthGuard)
  async getAll(): Promise<ArrayResponse<PostDto>> {
    return mapToArrayResponse(await this.postService.getAll());
  }

  @ApiOperation({ summary: 'Get comments on the post by post ID' })
  @ApiOkArrayResponse(CommentDto)
  @Get(':id/comments')
  @UseGuards(AuthGuard)
  async getAllComments(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ArrayResponse<CommentDto>> {
    return mapToArrayResponse(
      await this.commentService.getAllByPostId({ postId: id }),
    );
  }

  @ApiOperation({ summary: 'Get a post by ID' })
  @ApiOkResponse({
    description: 'Successfully retrieved post',
    type: PostDto,
  })
  @Get(':id')
  @UseGuards(AuthGuard)
  async getById(@Param('id', ParseIntPipe) id: number): Promise<PostDto> {
    return this.postService.getById({ id });
  }

  @ApiOperation({ summary: 'Create post' })
  @ApiOkResponse({
    description: 'Successfully created the post',
    type: PostDto,
  })
  @Post()
  @UseGuards(AuthGuard)
  async create(@Req() req, @Body() dto: PostCreateDto): Promise<PostDto> {
    const id = req.user.sub;

    const post = await this.postService.create({
      data: dto,
      creatorId: id,
    });

    return post;
  }

  @ApiOperation({ summary: 'Update post by ID' })
  @ApiOkResponse({
    description: 'Successfully updated the post',
    type: PostDto,
  })
  @Put(':id')
  @UseGuards(AuthGuard, RightGuardPost)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: PostUpdateDto,
  ): Promise<PostDto> {
    return this.postService.update({ data: dto, id });
  }

  @ApiOperation({ summary: 'Delete post by ID' })
  @ApiOkResponse({
    description: 'Post successfully deleted',
    type: PostDto,
  })
  @Delete(':id')
  @UseGuards(AuthGuard, RightGuardPost)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<PostDto> {
    const res = await this.postService.delete({ id });

    if (!res) {
      throw new BadRequestException(`Failed to delete post with id ${id}`);
    }

    return res;
  }

  @ApiOperation({ summary: 'Create сomment on a post' })
  @ApiOkResponse({
    description: 'Successfully created comment',
    type: CommentDto,
  })
  @Post(':id/comments')
  @UseGuards(AuthGuard)
  async createComment(
    @Req() req,
    @Param('id', ParseIntPipe) postId: number,
    @Body() dto: CommentCreateDto,
  ): Promise<CommentDto> {
    const creatorId = req.user.sub;

    return this.commentService.create({
      data: dto,
      creatorId,
      postId,
    });
  }
}
