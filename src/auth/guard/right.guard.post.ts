import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { PostService } from '../../posts/post.service';
import { Request } from 'express';

@Injectable()
export class RightGuardPost implements CanActivate {
    constructor(private readonly postService: PostService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request & { user: { sub: string } } = context
            .switchToHttp()
            .getRequest();

        const creatorId = Number(request.user.sub);

        const id = Number(request.params['id']);

        const post = await this.postService.getById({ id });

        if (!post) {
            throw new ForbiddenException('Object not found');
        }

        if (post.creatorid !== creatorId) {
            throw new ForbiddenException(
                'You do not have permission to perform this action',
            );
        }

        return true;
    }
}
