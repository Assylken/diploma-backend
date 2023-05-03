/*
  Warnings:

  - You are about to drop the column `playlistId` on the `users` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Playlist` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_playlistId_fkey";

-- AlterTable
ALTER TABLE "Playlist" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "playlistId" INTEGER;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "playlistId";

-- CreateTable
CREATE TABLE "PlaylistOnSong" (
    "playlistId" INTEGER NOT NULL,
    "songId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlaylistOnSong_pkey" PRIMARY KEY ("playlistId","songId")
);

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistOnSong" ADD CONSTRAINT "PlaylistOnSong_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistOnSong" ADD CONSTRAINT "PlaylistOnSong_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE SET NULL ON UPDATE CASCADE;
