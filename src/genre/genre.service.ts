import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GenreService {
  constructor(private prisma: PrismaService) {}
  async getGenre(id: number) {
    if (!id) return;
    const genre = await this.prisma.genre.findUnique({
      where: {
        id: id,
      },
    });
    return genre;
  }
  async getAllGenres() {
    const genre = await this.prisma.genre.findMany();
    return genre;
  }
}
