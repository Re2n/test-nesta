import { Post } from '@prisma/client';

export class PostEntity implements Post {
  id: number;
  content: string;
  creatorid: number;
}
