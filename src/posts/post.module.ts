import { forwardRef, Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostService } from './post.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { CommentModule } from '../comment/comment.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [PostsController],
  providers: [PostService],
  imports: [
    PrismaModule,
    forwardRef(() => UserModule),
    forwardRef(() => CommentModule),
    CommentModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        global: true,
        secret: config.getOrThrow('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
  exports: [PostService],
})
export class PostModule {}
