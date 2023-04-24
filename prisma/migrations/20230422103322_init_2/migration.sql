/*
  Warnings:

  - You are about to drop the column `userId` on the `Song` table. All the data in the column will be lost.
  - Made the column `genreId` on table `Song` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `songId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Song" DROP CONSTRAINT "Song_genreId_fkey";

-- DropForeignKey
ALTER TABLE "Song" DROP CONSTRAINT "Song_userId_fkey";

-- AlterTable
ALTER TABLE "Song" DROP COLUMN "userId",
ALTER COLUMN "genreId" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "songId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
