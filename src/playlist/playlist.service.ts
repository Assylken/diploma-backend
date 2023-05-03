import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddSongToPlaylistDTO, PlaylistDTO } from './dto';

@Injectable()
export class PlaylistService {
  constructor(private prisma: PrismaService) {}

  async createPlaylist(userId: number, dto: PlaylistDTO, file: string) {
    const playlist = await this.prisma.playlist.create({
      data: {
        playlist_name: dto.playlist_name,
        playlist_description: dto.playlist_description,
        playlist_avatar: file,
        userId: userId,
        isPrivate: !!+dto.isPrivate,
      },
    });
    return playlist;
  }
  async addToPlaylist(userId: number, dto: AddSongToPlaylistDTO) {
    const addToPlaylist = await this.prisma.playlistOnSong.create({
      data: {
        playlist: {
          connect: {
            id: Number(dto.playlistId),
          },
        },
        song: {
          connect: {
            id: Number(dto.songId),
          },
        },
      },
    });
    return addToPlaylist;
  }
  async getPlaylistByUserId(userId: number) {
    const getPlaylistByUserId = await this.prisma.playlist.findMany({
      where: {
        userId: userId,
      },
    });
    return getPlaylistByUserId;
  }
  async getPlaylistById(id: number) {
    const getPlaylistById = await this.prisma.playlist.findUnique({
      where: {
        id: id,
      },
    });
    return getPlaylistById;
  }
  async getSongsOfPlaylist(playlistId: number) {
    const res = await this.prisma.playlistOnSong.findMany({
      where: {
        playlistId: Number(playlistId),
      },
      select: {
        song: {
          select: {
            id: true,
            name: true,
            song_cid: true,
            image_cid: true,
            plays: true,
            genreId: true,
            userId: true,
          },
        },
      },
    });
    return res;
  }
  async getAllPlaylist() {
    const res = await this.prisma.playlist.findMany({
      where: {
        isPrivate: false,
      },
    });
    return res;
  }
}
