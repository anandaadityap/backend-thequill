/*
  Warnings:

  - You are about to drop the column `banned` on the `contents` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `images` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `image_banner` to the `contents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_content_id_fkey";

-- AlterTable
ALTER TABLE "contents" DROP COLUMN "banned",
ADD COLUMN     "image_banner" TEXT NOT NULL,
ADD COLUMN     "recomendation" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "name",
ADD COLUMN     "username" VARCHAR(50) NOT NULL;

-- DropTable
DROP TABLE "images";

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
