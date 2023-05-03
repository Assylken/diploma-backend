import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { GenreService } from './genre.service';
import { JwtGuard } from 'src/auth/guard';

@Controller('genre')
export class GenreController {
  constructor(private genreService: GenreService) {}
  @UseGuards(JwtGuard)
  @Get('getGenre/:id')
  async getGenre(@Param('id') id) {
    return this.genreService.getGenre(+id);
  }
  @Get('all')
  async getAllGenres() {
    return this.genreService.getAllGenres();
  }
}
