import {Controller, Get, Put, Delete, Param, ParseIntPipe, Body, BadRequestException} from '@nestjs/common';
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {CommentService} from "./comment.service";
import {ApiOkArrayResponse} from "../common/swagger.utils";
import {CommentDto} from "./dto/comment.dto";
import {ArrayResponse, mapToArrayResponse} from "../common/array.response";
import {CommentUpdateDto} from "./dto/comment.update.dto";

@ApiTags('Comments')
@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}
    
    @ApiOperation({summary: 'Get all comments'})
    @ApiOkArrayResponse(CommentDto)
    @Get('comment/getAll')
    async getAllComments(): Promise<ArrayResponse<CommentDto>>{
        return mapToArrayResponse(await this.commentService.getAll());
    }
    
    @ApiOperation({summary: 'Get comment by ID'})
    @ApiOkResponse({
        description: 'Successfully retrieved the comment',
        type: CommentDto,
    })
    @Get('comment/getById')
    async getCommentById(@Param('id', ParseIntPipe) id: number): Promise<CommentDto>{
        return this.commentService.getById({id})
    }
    
    @ApiOperation({summary: 'Update a comment by comment ID'})
    @ApiOkResponse({
        description: 'Successfully updated the comment',
        type: CommentDto,
    })
    @Put('comment/update')
    async updateComment(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: CommentUpdateDto,
    ): Promise<CommentDto>{
        return this.commentService.update({data: dto, id});
    }
    
    @ApiOperation({summary: 'Delete a comment by ID'})
    @ApiOkResponse({
        description: 'Successfully deleted the comment',
        type: CommentDto,
    })
    @Delete('comment/delete')
    async deleteComment(@Param('id', ParseIntPipe) id: number): Promise<CommentDto>{
        const res = await this.commentService.delete({id});
        
        if (!res){
            throw new BadRequestException(`Failed to delete comment with id ${id}`);
        }
        return res;
    }
}
