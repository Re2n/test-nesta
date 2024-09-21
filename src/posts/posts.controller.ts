import {Body, Controller, Get, Param, ParseIntPipe, Post} from '@nestjs/common';
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {PostService} from "./post.service";
import {PostDto} from "./dto/post.dto";
import {PostCreateDto} from "./dto/post.create.dto";

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
    constructor(private readonly postService: PostService) {}
    
    @ApiOperation({summary: 'Create post' })
    @ApiOkResponse({
        description: 'Successfully created the post',
        type: PostDto,
    })
    @Post()
    async create(@Body() dto: PostCreateDto): Promise<PostDto>{
        const post = await this.postService.create({
            data: dto,
        });
        return post;
    }
    
    @ApiOperation({summary: 'Get a post by ID'})
    @ApiOkResponse({
        description: 'Successfully retrivied post',
        type: PostDto,
    })
    @Get(':id')
    async getById(@Param('id', ParseIntPipe) id: number){
        return this.postService.getById({id});
    }
    
}
