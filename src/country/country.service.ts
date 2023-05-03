import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CountryService {
  constructor(private prisma: PrismaService) {}
  async getCountry(id: number) {
    if (!id) return;

    const country = await this.prisma.country.findUnique({
      where: {
        id: id,
      },
    });
    return country;
  }
  async getAllCountry() {
    const country = await this.prisma.country.findMany();
    return country;
  }
}
