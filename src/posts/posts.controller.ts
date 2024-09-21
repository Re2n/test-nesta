import {BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req} from '@nestjs/common';
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {PostService} from "./post.service";
import {PostDto} from "./dto/post.dto";
import {PostCreateDto} from "./dto/post.create.dto";
import {ApiOkArrayResponse} from "../common/swagger.utils";
import {ArrayResponse, mapToArrayResponse} from "../common/array.response";
import {PostUpdateDto} from "./dto/post.update.dto";
import {CommentService} from "../comment/comment.service";
import {CommentDto} from "../comment/dto/comment.dto";
import {CommentCreateDto} from "../comment/dto/comment.create.dto";

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
    constructor(private readonly postService: PostService,
                private readonly commentService: CommentService
    ) {}
    
    @ApiOperation({summary: 'Create post' })
    @ApiOkResponse({
        description: 'Successfully created the post',
        type: PostDto,
    })
    @Post('post/create')
    async create(@Req() req, @Body() dto: PostCreateDto): Promise<PostDto>{
        const id = req.user.sub;
        
        const post = await this.postService.create({
            data: dto,
            creatorId: id,
        });
        
        return post;
    }
    
    @ApiOperation({summary: 'Get a post by ID'})
    @ApiOkResponse({
        description: 'Successfully retrieved post',
        type: PostDto,
    })
    @Get('post/:id')
    async getById(@Param('id', ParseIntPipe) id: number){
        return this.postService.getById({id});
    }
    
    @ApiOperation({summary: 'Get all posts'})
    @ApiOkArrayResponse(PostDto)
    @Get('post/getAll')
    async getAll(): Promise<ArrayResponse<PostDto>>{
        return mapToArrayResponse(
            await this.postService.getAll()
        );
    }
    
    @ApiOperation({summary: 'Update post by ID'})
    @ApiOkResponse({
        description: 'Successfully updated the post',
        type: PostDto,
    })
    @Put('post/update')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: PostUpdateDto,
    ): Promise<PostDto>{
        return this.postService.update({data: dto, id})
    }
    
    @ApiOperation({summary: 'Delete post by ID'})
    @ApiOkResponse({
        description: 'Post successfully deleted',
        type: PostDto,
    })    
    @Delete('post/delete')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<PostDto>{
        const res = await this.postService.delete({id});
        
        if(!res){
            throw new BadRequestException(`Failed to delete post with id ${id}`);
        }
        
        return res;
    }
    
    @ApiOperation({summary: 'Get comments on the post by post ID'})
    @ApiOkArrayResponse(CommentDto)
    @Get('post/getComments')
    async getAllComments(@Param('id', ParseIntPipe) id: number): Promise<ArrayResponse<CommentDto>>{
        return mapToArrayResponse(await this.commentService.getAllByPostId({postId: id}));
    }
    
    @ApiOperation({summary: 'Create сomment on a post'})
    @ApiOkResponse({
        description: 'Successfully created comment',
        type: CommentDto,
    })
    @Post('post/:id/comments')
    async createComment(@Req() req,
                        @Param('id', ParseIntPipe) postId: number,
                        @Body() dto: CommentCreateDto,
    ): Promise<CommentDto>{
        const creatorId = req.user.sub;
        
        return this.commentService.create({
            data: dto,
            creatorId,
            postId,
        });
    }           
}
