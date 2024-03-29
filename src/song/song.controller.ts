import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SongService } from './song.service';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { AddPlays, UploadSongDto } from './dto';
import {
  AnyFilesInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { ipfs_client } from 'utils/ipfs';
import { globSource } from 'ipfs-http-client';
import { diskStorage } from 'multer';
import { promisify } from 'util';
import { create } from 'ipfs-http-client';

const fs = require('fs');

enum ValidFileTypes {
  'audio/mp3' = 'audio/mp3',
  'audio/mp4' = 'audio/mp4',
  'audio/mpeg' = 'audio/mpeg',
  'application/json' = 'application/json',
}

export enum ExtraAttributes {
  fileSize = 'fileSize',
  fileType = 'fileType',
  objectHash = 'objectHash',
}

export interface IpfsMetaObject {
  name: string;
  image: string;
  genre: number;
  audio: string;
}

@Controller('songs')
export class SongController {
  constructor(private songService: SongService) {}
  @UseGuards(JwtGuard)
  @Post('upload-song')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadSong(
    @GetUser('id') userId: number,
    @Body() dto: UploadSongDto,
    @UploadedFiles() files,
  ) {
    return this.songService.uploadSong(userId, dto, files);
  }

  //@UseGuards(JwtGuard)
  @Get('getAll')
  async getAllSongs() {
    return this.songService.getAllSongs();
  }

  @UseGuards(JwtGuard)
  @Get('getSong')
  async getSong(@GetUser('id') userId: number) {
    return this.songService.getSong(userId);
  }

  @Get('getSongsNumber/:id')
  async getSongNumber(@Param('id') id) {
    return this.songService.getSongsNumber(+id);
  }

  @Get('getPopularSongs')
  async getPopularSongs() {
    return this.songService.getPopularSongs();
  }

  @Get('getSongsUser/:id')
  async getSongsUser(@Param('id') id) {
    return this.songService.getSongsUser(+id);
  }

  @Patch('addCurrentPlays')
  async addCurrentPlays(@Body() dto: AddPlays) {
    return this.songService.addCurrentPlays(dto);
  }

  @Patch('addTotalPlays/:id')
  async addTotalPlays(@Param('id') id) {
    return this.songService.addTotalPlays(+id);
  }
}
