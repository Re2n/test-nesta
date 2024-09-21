import { Post } from '@prisma/client';
export declare class PostEntity implements Post {
    id: number;
    comment_id: number[];
    user_id: number;
}
