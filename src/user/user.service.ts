import { Injectable, Res } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto, EditUserImageDto } from './dto';

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

  getUsername(id: number) {
    const user = this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }
}
