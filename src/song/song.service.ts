import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddPlays, UploadSongDto } from './dto';
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

  async getCurrentPlays(songId: number) {
    const plays = await this.prisma.song.findMany({
      where: {
        id: Number(songId),
      },
      select: {
        currentPlays: true,
      },
    });
    var temp = 0;
    plays.map((value: any) => {
      temp = value.currentPlays;
    });
    return temp;
  }

  async getTotalPlays(songId: number) {
    const plays = await this.prisma.song.findMany({
      where: {
        id: Number(songId),
      },
      select: {
        plays: true,
      },
    });
    var temp = 0;
    plays.map((value: any) => {
      temp = value.plays;
    });
    return temp;
  }

  async addCurrentPlays(dto: AddPlays) {
    const currentPlays = await this.getCurrentPlays(dto.songId);
    if (currentPlays >= 10) this.addTotalPlays(dto.songId);
    const song = await this.prisma.song.update({
      where: {
        id: Number(dto.songId),
      },
      data: {
        currentPlays: Number(currentPlays) + Number(dto.plays),
      },
    });
    return song;
  }
  async addTotalPlays(id: number) {
    const totalPlays = await this.getTotalPlays(id);
    const currentPlays = await this.getCurrentPlays(id);
    const song = await this.prisma.song.update({
      where: {
        id: Number(id),
      },
      data: {
        plays: Number(totalPlays) + Number(currentPlays),
        currentPlays: 0,
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

  async getPopularSongs() {
    const songs = await this.prisma.song.findMany({
      orderBy: {
        currentPlays: 'asc',
      },
      take: 4,
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

  async getSongsNumber(userId: number) {
    console.log('WASDL');

    const songNumber = await this.prisma.song.aggregate({
      where: {
        userId: Number(userId),
      },
      _count: {
        id: true,
      },
    });
    return songNumber;
  }

  async getSongsUser(userId: number) {
    const song = await this.prisma.song.findMany({
      where: {
        userId: Number(userId),
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
