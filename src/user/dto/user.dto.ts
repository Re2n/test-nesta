import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
    @ApiProperty({
        description: 'Id for the user',
        type: Number,
    })
    id: number;

    @ApiProperty({
        description: 'Username of the user',
        type: String,
    })
    username: string;
}
