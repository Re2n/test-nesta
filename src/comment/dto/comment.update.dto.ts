import {ApiProperty} from "@nestjs/swagger";
import {IsString, MaxLength, MinLength} from "class-validator";

export class CommentUpdateDto{
    @ApiProperty({
        description: 'Content of the comment',
        minLength: 1,
        maxLength: 255,
        type: String,
    })
    @MinLength(1, {message: 'Content is too short. Minimum length is 1 character.'})
    @MaxLength(255, {message: 'Content is too long. Max length is 255 characters'})
    @IsString()
    content: string;
}