-- DropForeignKey
ALTER TABLE "PlaylistOnSong" DROP CONSTRAINT "PlaylistOnSong_playlistId_fkey";

-- AddForeignKey
ALTER TABLE "PlaylistOnSong" ADD CONSTRAINT "PlaylistOnSong_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
