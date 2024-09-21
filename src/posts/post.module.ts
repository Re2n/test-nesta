import {Module} from "@nestjs/common";
import {PostsController} from "./posts.controller";
import {PostService} from "./post.service";
import {PrismaModule} from "../prisma/prisma.module";


@Module({
    imports: [PrismaModule],
    controllers: [PostsController],
    providers: [PostService],
})
export class PostModule{}