import {PostDto} from "../dto/post.dto";
import {PostEntity} from "../entity/post.entity";

export function mapToPostDto(db: PostEntity){
    return{
        id: db.id,
        comment_id: db.comment_id,
        user_id: db.user_id,
    } as PostDto;
}