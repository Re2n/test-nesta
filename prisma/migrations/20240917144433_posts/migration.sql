-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "comment_id" INTEGER[],
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);
