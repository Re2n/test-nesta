import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import {PrismaService} from "../prisma/prisma.service";

@Module({
  providers: [CommentService],
})
export class CommentModule {}
