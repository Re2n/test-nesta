import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class PostCreateDto {
    @ApiProperty({
        description:
            'Content of the column. Must be a string between 1 and 511 characters',
        minLength: 1,
        maxLength: 511,
        type: String,
    })
    @IsString()
    @MinLength(1, {
        message: 'Content is too short. Minimum length is 1 character.',
    })
    @MaxLength(511, {
        message: 'Content is too long. Max length is 511 characters',
    })
    content: string;
}
