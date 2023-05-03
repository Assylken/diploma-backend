import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { PlaylistService } from './playlist.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser } from 'src/auth/decorator';
import { AddSongToPlaylistDTO, PlaylistDTO } from './dto';
import { diskStorage } from 'multer';
import { Response } from 'express';

export const storage = {
  storage: diskStorage({
    destination: './uploads/playlistImages',
    filename: (req, file, cb) => {
      const name = file.originalname.split('.')[0];
      const fileExtension = file.originalname.split('.')[1];
      const newFileName =
        name.split(' ').join('_') + '_' + Date.now() + '.' + fileExtension;
      cb(null, newFileName);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(null, false);
    }
    cb(null, true);
  },
};

@Controller('playlist')
export class PlaylistController {
  constructor(private playlistService: PlaylistService) {}
  @UseGuards(JwtGuard)
  @Post('createPlaylist')
  @UseInterceptors(FileInterceptor('playlist_avatar', storage))
  async createPlaylist(
    @GetUser('id') userId: number,
    @Body() dto: PlaylistDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    var sendFile = '';
    if (file == null) sendFile = 'null';
    else sendFile = `http://localhost:3333/playlist/images/${file.filename}`;
    if (!file && file != null) {
      throw new BadRequestException('File is not an image');
    } else {
      return this.playlistService.createPlaylist(userId, dto, sendFile);
    }
  }
  @Get('images/:filename')
  async getImage(@Param('filename') filename, @Res() res: Response) {
    res.sendFile(filename, { root: 'uploads/playlistImages' });
  }
  @UseGuards(JwtGuard)
  @Post('addToPlaylist')
  async addToPlaylist(
    @GetUser('id') userId: number,
    @Body() dto: AddSongToPlaylistDTO,
  ) {
    return this.playlistService.addToPlaylist(userId, dto);
  }
  @UseGuards(JwtGuard)
  @Get('getPlaylistByUserId')
  async getPlaylistByUserId(@GetUser('id') userId: number) {
    return this.playlistService.getPlaylistByUserId(userId);
  }
  @UseGuards(JwtGuard)
  @Get('getPlaylistById/:id')
  async getPlaylistById(@Param('id') id) {
    return this.playlistService.getPlaylistById(+id);
  }
  @UseGuards(JwtGuard)
  @Get('getSongsOfPlaylist/:id')
  async getSongsOfPlaylist(@Param('id') id) {
    return this.playlistService.getSongsOfPlaylist(id);
  }
  @UseGuards(JwtGuard)
  @Get('getAllPlaylist')
  async getAllPlaylist() {
    return this.playlistService.getAllPlaylist();
  }
}
