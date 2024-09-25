import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserSignInDto {
    @ApiProperty({
        description: 'Username of the user',
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        description: 'The password of the user',
    })
    @IsNotEmpty()
    @IsString()
    password: string;
}
