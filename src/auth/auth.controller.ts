import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Patch,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { TokenDto } from './dto/token.dto';
import { UserSignInDto } from './dto/user.sign-in.dto';
import { UserRegisterDto } from './dto/user.register.dto';
import { UserDto } from '../user/dto/user.dto';
import { AuthGuard } from './guard/auth.guard';
import { UserUpdateDto } from './dto/user.update.dto';

@ApiBearerAuth('JWT-auth')
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: 'Sigh in a user' })
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Successfully signed in',
        type: TokenDto,
    })
    @Post('signIn')
    signIn(@Body() dto: UserSignInDto) {
        return this.authService.signIn({
            data: dto,
        });
    }

    @ApiOperation({ summary: 'Register a new user' })
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Successfully registered',
        type: TokenDto,
    })
    @Post('register')
    register(@Body() dto: UserRegisterDto) {
        return this.authService.register({ data: dto });
    }

    @ApiOperation({ summary: 'Update user credentials' })
    @ApiOkResponse({
        description: 'Successfully updated user credentials',
        type: UserDto,
    })
    @Patch('credentials')
    @UseGuards(AuthGuard)
    async update(@Req() req, @Body() dto: UserUpdateDto): Promise<UserDto> {
        const id = req.sub.id;

        return this.authService.update({ id, data: dto });
    }
}
