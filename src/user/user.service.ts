import { Injectable, Res } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  EditUserDto,
  EditUserImageDto,
  UserSubcription,
  UserWalletAddress,
} from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async editUser(userId: number, dto: EditUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username: dto.username,
        firstName: dto.firstName,
        lastName: dto.lastName,
        bio: dto.bio,
        countryId: Number(dto.countryId),
      },
    });
    delete user.hash;
    return user;
  }

  async addWalletAddress(userId: number, dto: UserWalletAddress) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        wallet_address: dto.wallet_address,
      },
    });
    delete user.hash;
    return user;
  }

  async UserSubcription(dto: UserSubcription) {
    const user = await this.prisma.user.update({
      where: {
        id: Number(dto.id),
      },
      data: {
        subscription: !!+dto.subscription,
      },
    });
    delete user.hash;
    return user;
  }

  async editImage(userId: number, file: string) {
    console.log(userId);

    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },

      data: {
        profileImage: file,
      },
    });
    delete user.hash;
    return user;
  }

  async getUsername(id: number) {
    console.log('ADASD', id);
    if (id) {
      const user = this.prisma.user.findUnique({
        where: {
          id: Number(id),
        },
      });

      return user;
    }
    return null;
  }

  async getTopArtists() {
    const user = this.prisma.user.findMany({
      orderBy: {
        id: 'asc',
      },
      where: {
        isArtist: true,
      },
      take: 5,
    });

    return user;
  }
}
