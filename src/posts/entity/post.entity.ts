import {Post} from '@prisma/client'

export class PostEntity implements Post{
    id: number;
    comment_id: number[];
    user_id: number;
}