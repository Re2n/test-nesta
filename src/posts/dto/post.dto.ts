import {ApiProperty} from "@nestjs/swagger";

export class PostDto{
    @ApiProperty({
        description: 'Unique identifier of the post',
        type: Number,
    })
    id: number;
    
    @ApiProperty({
        description: 'Array of comment id',
        type: [Number],
    })
    comment_id: number[];
    
    @ApiProperty({
        description: 'Identifier of the creator post',
        type: Number,
    })
    user_id: number;
}