import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {CommentCreateDto} from "./dto/comment.create.dto";
import {CommentDto} from "./dto/comment.dto";
import {mapToCommentDto} from "./mappers/comment.mapper";
import {PostService} from "../posts/post.service";
import {CommentUpdateDto} from "./dto/comment.update.dto";

@Injectable()
export class CommentService {
    constructor(private readonly prisma: PrismaService,
                private readonly postService: PostService
    ) {}
    
    async create(params: {
        data: CommentCreateDto;
        creatorId: number;
        postId: number
    }): Promise<CommentDto>{
        const {data, creatorId, postId} = params;
        
        const dbComment = await this.prisma.comment.create({
            data: {content: data.content, creatorId, postId},
        });
        
        return mapToCommentDto(dbComment);
    }
    
    async getAll(): Promise<CommentDto[]>{
        
        const comments = await this.prisma.comment.findMany();
        
        return comments.map(mapToCommentDto);
    }
    
    async getById(params: {
        id: number;
    }): Promise<CommentDto>{
        const {id} = params;
        
        const dbComment = await this.prisma.comment.findUnique({
            where: {id},
        });
        
        if (!dbComment) {
            throw new NotFoundException(`Comment with id ${id} does not exists`);
        }
        
        return mapToCommentDto(dbComment);
    }
    
    async getAllByCreatorId(params: {
        creatorId: number;
    }): Promise<CommentDto[]>{
        const {creatorId} = params;
        
        //await this.userService.assert....
        
        const comments = await this.prisma.comment.findMany({
            where: {creatorId},
        });
        
        return comments.map(mapToCommentDto);
    }
    
    async getAllByPostId(params: {
        postId: number;
    }): Promise<CommentDto[]>{
        const {postId} = params;
        
        await this.postService.assertPostExists({id: postId});
        
        const comments = await this.prisma.comment.findMany({
            where: {postId},
        });
        
        return comments.map(mapToCommentDto);
    }
    
    async assertCommentExists(params: {id: number}){
        const{id} = params;
        
        const dbComment = await this.prisma.comment.findUnique({
            where: {id},
        });
        
        if (!dbComment){
            throw new NotFoundException(`Comment with id ${id} does not exists`);
        }
    }
    
    async update(params: {
        data: CommentUpdateDto;
        id: number;
    }): Promise<CommentDto>{
        const {data, id} = params;
        
        await this.assertCommentExists({id});
        
        const updatedComment = await this.prisma.comment.update({
            where: {id},
            data: {content: data.content},
        });
        
        return mapToCommentDto(updatedComment);
    }
    
    async delete(params: {
        id: number;
    }): Promise<CommentDto>{
        const {id} = params;
        
        await this.assertCommentExists({id});
        
        const deletedComment = await this.prisma.comment.delete({
            where: {id},
        });
        
        return mapToCommentDto(deletedComment);
    }
}
