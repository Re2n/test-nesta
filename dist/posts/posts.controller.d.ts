import { PostService } from "./post.service";
import { PostDto } from "./dto/post.dto";
import { PostCreateDto } from "./dto/post.create.dto";
export declare class PostsController {
    private readonly postService;
    constructor(postService: PostService);
    create(dto: PostCreateDto): Promise<PostDto>;
    getById(id: number): Promise<PostDto>;
}
