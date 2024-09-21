import { Module } from '@nestjs/common';
import { PostsController } from './posts/posts.controller';
import { PrismaModule } from './prisma/prisma.module';
import {PostModule} from "./posts/post.module";
import { CommentsController } from './comments/comments.controller';
import { CommentsModule } from './comments/comments.module';
import { CommentController } from './comment/comment.controller';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
      PostModule,
      PrismaModule,
      CommentsModule,
      CommentModule
  ],
  controllers: [CommentsController, CommentController],
  providers: [],
})
export class AppModule {}
