import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PostCreateDto } from './dto/post.create.dto';
import { PostDto } from './dto/post.dto';
import { mapToPostDto } from './mappers/post.mapper';
import { PostUpdateDto } from './dto/post.update.dto';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async create(params: {
    data: PostCreateDto;
    creatorId: number;
  }): Promise<PostDto> {
    const { data, creatorId } = params;

    const dbPost = await this.prisma.post.create({
      data: {
        content: data.content,
        creatorid: creatorId,
      },
    });

    return mapToPostDto(dbPost);
  }

  async assertPostExists(params: { id: number }) {
    const { id } = params;

    const dbPost = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!dbPost) {
      throw new NotFoundException(`Post with id ${id} does not exists`);
    }
  }

  async getById(params: { id: number }): Promise<PostDto> {
    const { id } = params;

    const dbPost = await this.prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!dbPost) {
      throw new NotFoundException(`Post with id ${id} does not exist`);
    }

    return mapToPostDto(dbPost);
  }

  async update(params: { data: PostUpdateDto; id: number }): Promise<PostDto> {
    const { data, id } = params;

    await this.assertPostExists({ id });

    const updatedPost = await this.prisma.post.update({
      where: { id },
      data: { content: data.content },
    });

    return mapToPostDto(updatedPost);
  }

  async getAll(): Promise<PostDto[]> {
    const posts = await this.prisma.post.findMany();

    return posts.map(mapToPostDto);
  }

  async getAllByCreatorId(params: { creatorId: number }): Promise<PostDto[]> {
    const { creatorId } = params;

    const posts = await this.prisma.post.findMany({
      where: { creatorid: creatorId },
    });

    return posts.map(mapToPostDto);
  }

  async delete(params: { id: number }): Promise<PostDto> {
    const { id } = params;

    await this.assertPostExists({ id });

    const deletedPost = await this.prisma.post.delete({
      where: { id },
    });

    return mapToPostDto(deletedPost);
  }
}
