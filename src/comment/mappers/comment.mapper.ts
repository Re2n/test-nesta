import { CommentEntity } from '../entity/comment.entity';
import { CommentDto } from '../dto/comment.dto';

export function mapToCommentDto(db: CommentEntity) {
    return {
        id: db.id,
        content: db.content,
        creatorId: db.creatorId,
        postId: db.postId,
    } as CommentDto;
}
