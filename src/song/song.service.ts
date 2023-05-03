import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadSongDto } from './dto';
import { ipfs_client } from 'utils/ipfs';

@Injectable()
export class SongService {
  constructor(private prisma: PrismaService) {}
  async uploadSong(
    userId: number,
    dto: UploadSongDto,
    files: Array<Express.Multer.File>,
  ) {
    console.log(dto);
    console.log(files);

    //const url = 'https://chris-anatalio.infura-ipfs.io/ipfs/';
    const cid_image = await ipfs_client().add(files[1].buffer);
    const cid_audio = await ipfs_client().add(files[0].buffer);
    const song = await this.prisma.song.create({
      data: {
        name: dto.name,
        genreId: Number(dto.genreId),
        song_cid: cid_audio.path,
        image_cid: cid_image.path,
        userId: userId,
      },
    });
    return song;
  }

  async getAllSongs() {
    const songs = await this.prisma.song.findMany({
      orderBy: {
        id: 'desc',
      },
    });
    return songs;
  }

  async getSong(userId: number) {
    const song = await this.prisma.song.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        id: 'desc',
      },
    });
    return song;
  }

  async getGenre(id: number) {
    const genre = await this.prisma.genre.findFirst({
      where: {
        id: id,
      },
    });
    return genre.genre_name;
  }
}
