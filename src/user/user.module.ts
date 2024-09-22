import {forwardRef, Module} from '@nestjs/common';
import { UserService } from './user.service';
import {UserController} from "./user.controller";
import {PrismaModule} from "../prisma/prisma.module";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {PostModule} from "../posts/post.module";
import {CommentModule} from "../comment/comment.module";

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
      PrismaModule,
      JwtModule.registerAsync({
          imports: [ConfigModule], 
          inject: [ConfigService],
          useFactory: (config: ConfigService) => ({
              global: true,
              secret: config.getOrThrow('JWT_SECRET'),
              signOptions: {expiresIn: '7d'},
          }),
      }),
      forwardRef(() => PostModule),
      CommentModule,
  ], 
    exports: [UserService],
})
export class UserModule {}
