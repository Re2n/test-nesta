import {ApiProperty} from "@nestjs/swagger";

export class PostCreateDto{
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