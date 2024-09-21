import {Injectable, NotFoundException} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {PostCreateDto} from "./dto/post.create.dto";
import {PostDto} from "./dto/post.dto";
import {mapToPostDto} from "./mappers/post.mapper";


@Injectable()
export class PostService{
    constructor(private readonly prisma: PrismaService) {}
    
    async create(params: {
        data: PostCreateDto;
    }): Promise<PostDto>{
        const {data} = params;
        
        const dbPost = await this.prisma.post.create({
            data: {
                comment_id: data.comment_id,
                user_id: data.user_id,
            },
        });
        
        return mapToPostDto(dbPost);
    }
    
    async getById(params: {id: number}):Promise<PostDto>{
        const {id} = params;
        
        const dbPost = await this.prisma.post.findUnique({
            where: {
                id,
            },
        });
        
        if (!dbPost){
            throw new NotFoundException(`Comment with id ${id} does not exist`);
        }
        
        return mapToPostDto(dbPost);
    }
}