import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserUpdateDto {
  @ApiProperty({
    description: 'Username of the user',
    type: String,
    minLength: 2,
    maxLength: 30,
    required: false,
  })
  @MinLength(2, {
    message: 'Username is too short. Min length if 2 characters',
  })
  @MaxLength(30, {
    message: 'Username is too long. Max length is 30 characters',
  })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({
    description: 'The password of the user',
    minLength: 6,
    required: false,
  })
  @MinLength(6, {
    message: 'Password is too short. Min length is 6 characters',
  })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
    message: 'Password must contain at least one letter and one number',
  })
  @IsString()
  @IsOptional()
  password?: string;
}
