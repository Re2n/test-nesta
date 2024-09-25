import {
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Req,
    UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CommentService } from '../comment/comment.service';
import { PostService } from '../posts/post.service';
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { ApiOkArrayResponse } from '../common/swagger.utils';
import { PostDto } from '../posts/dto/post.dto';
import { ArrayResponse, mapToArrayResponse } from '../common/array.response';
import { CommentDto } from '../comment/dto/comment.dto';
import { AuthGuard } from '../auth/guard/auth.guard';

@ApiBearerAuth('JWT-auth')
@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly commentService: CommentService,
        private readonly postService: PostService,
    ) {}

    @ApiOperation({ summary: "Get the current authenticated user's details" })
    @ApiOkResponse({
        type: UserDto,
        description: 'Successfully retrieved details',
    })
    @Get('me')
    @UseGuards(AuthGuard)
    async getMe(@Req() req): Promise<UserDto> {
        const id = req.user.sub;

        return this.userService.getById({ id });
    }

    @ApiOperation({ summary: 'Get all posts by a user' })
    @ApiOkArrayResponse(PostDto)
    @Get(':id/posts')
    @UseGuards(AuthGuard)
    async getPosts(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ArrayResponse<PostDto>> {
        return mapToArrayResponse(
            await this.postService.getAllByCreatorId({ creatorId: id }),
        );
    }

    @ApiOperation({ summary: 'Get all comments by a user' })
    @ApiOkArrayResponse(CommentDto)
    @Get(':id/comments')
    @UseGuards(AuthGuard)
    async getComments(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ArrayResponse<CommentDto>> {
        return mapToArrayResponse(
            await this.commentService.getAllByCreatorId({ creatorId: id }),
        );
    }
}
