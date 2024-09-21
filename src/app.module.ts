import { Module } from '@nestjs/common';
import { PostsController } from './posts/posts.controller';
import { PrismaModule } from './prisma/prisma.module';
import {PostModule} from "./posts/post.module";

@Module({
  imports: [
      PostModule,
      PrismaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
