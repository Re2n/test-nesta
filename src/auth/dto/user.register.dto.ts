import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UserRegisterDto {
  @ApiProperty({
    description: 'Username of the user',
    type: String,
    minLength: 2,
    maxLength: 30,
  })
  @MinLength(2, {
    message: 'Username is too short. Min length if 2 characters',
  })
  @MaxLength(30, {
    message: 'Username is too long. Max length is 30 characters',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'The password of the user',
    minLength: 6,
  })
  @MinLength(6, {
    message: 'Password is too short. Min length is 6 characters',
  })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
    message: 'Password must contain at least one letter and one number',
  })
  @IsString()
  password: string;
}
