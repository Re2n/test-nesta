import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRegisterDto } from '../auth/dto/user.register.dto';
import { User } from '@prisma/client';
import { UserDto } from './dto/user.dto';
import { UserUpdateDto } from '../auth/dto/user.update.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(params: { data: UserRegisterDto }): Promise<User> {
    const { data } = params;

    return this.prisma.user.create({
      data: {
        username: data.username,
        password: data.password,
      },
    });
  }

  async assertUserExists(params: { id: number }) {
    const { id } = params;

    const dbUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!dbUser) {
      throw new NotFoundException(`User with id ${id} does not exists`);
    }
  }

  async getById(params: { id: number }): Promise<UserDto> {
    const { id } = params;

    const dbUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!dbUser) {
      throw new NotFoundException(`User with id ${id} does not exists`);
    }

    return { id, username: dbUser.username };
  }

  async getByUsername(params: { username: string }): Promise<User | null> {
    const { username } = params;

    const dbUser = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!dbUser) {
      return null;
    }

    return dbUser;
  }

  async update(params: { id: number; data: UserUpdateDto }): Promise<UserDto> {
    const { data, id } = params;

    await this.assertUserExists({ id });

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        username: data.username,
        password: data.password,
      },
    });

    return {
      id,
      username: updatedUser.username,
    };
  }
}
