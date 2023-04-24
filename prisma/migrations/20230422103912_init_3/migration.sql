-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_songId_fkey";

-- AlterTable
ALTER TABLE "Song" ALTER COLUMN "plays" DROP NOT NULL,
ALTER COLUMN "currentPlays" DROP NOT NULL,
ALTER COLUMN "level" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "songId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE SET NULL ON UPDATE CASCADE;
