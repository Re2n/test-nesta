import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserRegisterDto } from './dto/user.register.dto';
import { TokenDto } from './dto/token.dto';
import * as bcrypt from 'bcrypt';
import { UserSignInDto } from './dto/user.sign-in.dto';
import { UserUpdateDto } from './dto/user.update.dto';
import { UserDto } from '../user/dto/user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async register(params: { data: UserRegisterDto }): Promise<TokenDto> {
        const { data } = params;

        const dbUser = await this.userService.getByUsername({
            username: data.username,
        });

        if (!!dbUser) {
            throw new BadRequestException(
                `User with username ${data.username} already exists`,
            );
        }

        data.password = bcrypt.hashSync(data.password, 10);

        const newUser = await this.userService.create({ data });

        const payload = { sub: newUser.id };

        return {
            accessToken: await this.jwtService.signAsync(payload),
        };
    }

    async signIn(params: { data: UserSignInDto }): Promise<TokenDto> {
        const { data } = params;

        const dbUser = await this.userService.getByUsername({
            username: data.username,
        });

        if (!dbUser) {
            throw new NotFoundException(
                `User with username ${data.username} already exists`,
            );
        }

        const payload = { sub: dbUser.id };

        return {
            accessToken: await this.jwtService.signAsync(payload),
        };
    }

    async update(params: {
        id: number;
        data: UserUpdateDto;
    }): Promise<UserDto> {
        const { data, id } = params;

        await this.userService.getById({ id });

        if (data.username) {
            const dbUser = await this.userService.getByUsername({
                username: data.username,
            });

            if (!!dbUser && dbUser.id !== id) {
                throw new BadRequestException(
                    `User with username ${data.username} already exists`,
                );
            }
        }

        if (data.password) {
            data.password = bcrypt.hashSync(data.password, 10);
        }

        return this.userService.update({ id, data });
    }
}
