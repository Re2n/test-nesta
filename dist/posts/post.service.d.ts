import { PrismaService } from "../prisma/prisma.service";
import { PostCreateDto } from "./dto/post.create.dto";
import { PostDto } from "./dto/post.dto";
export declare class PostService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(params: {
        data: PostCreateDto;
    }): Promise<PostDto>;
    getById(params: {
        id: number;
    }): Promise<PostDto>;
}
