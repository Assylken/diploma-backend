/*
  Warnings:

  - You are about to drop the column `songId` on the `users` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Song` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_songId_fkey";

-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "songId";

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
