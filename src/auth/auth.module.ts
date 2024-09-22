import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {UserModule} from "../user/user.module";
import {CommentModule} from "../comment/comment.module";
import {PostModule} from "../posts/post.module";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {JwtModule} from "@nestjs/jwt";
import {AuthGuard} from "./guard/auth.guard";
import {RightGuardComment} from "./guard/right.guard.comment";
import {RightGuardPost} from "./guard/right.guard.post";
import {AuthController} from "./auth.controller";

@Module({
  imports: [
      UserModule,
      CommentModule,
      PostModule,
      ConfigModule.forRoot(),
      JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          global: true,
          secret: config.getOrThrow('JWT_SECRET'),
          signOptions: {expiresIn: '7d'},
        }),
      }),
  ],
  providers: [
      AuthService,
      AuthGuard,
      RightGuardComment,
      RightGuardPost,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
