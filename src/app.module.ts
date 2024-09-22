import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import {PostModule} from "./posts/post.module";
import { CommentModule } from './comment/comment.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
      ConfigModule.forRoot(),
      PostModule,
      PrismaModule,
      CommentModule,
      UserModule,
      AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
