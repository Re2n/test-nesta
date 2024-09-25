import { PostDto } from '../dto/post.dto';
import { PostEntity } from '../entity/post.entity';

export function mapToPostDto(db: PostEntity) {
    return {
        id: db.id,
        content: db.content,
        creatorid: db.creatorid,
    } as PostDto;
}
