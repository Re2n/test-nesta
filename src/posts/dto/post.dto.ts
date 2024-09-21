import {ApiProperty} from "@nestjs/swagger";

export class PostDto{
    @ApiProperty({
        description: 'Unique identifier of the post',
        type: Number,
    })
    id: number;
    
    @ApiProperty({
        description: 'Content of the post',
        type: String,
    })
    content: string;
    
    @ApiProperty({
        description: 'Identifier of the user who created the post',
        type: Number,
    })
    creatorid: number;
}