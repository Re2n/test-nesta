import {ApiProperty} from "@nestjs/swagger";

export class CommentDto{
    @ApiProperty({
        description: 'ID of the comment',
        type: Number,
    })
    id: number;
    
    @ApiProperty({
        description: 'Content of the comment',
        type: String,
    })
    content: string;
    
    @ApiProperty({
        description: 'Id of the user who created the comment',
        type: Number,
    })
    creatorId: number;
    
    @ApiProperty({
        description: 'Id of the post under which the comment was left',
        type: Number,
    })
    postId: number;
}