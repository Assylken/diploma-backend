import { Injectable } from '@nestjs/common';
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
        ...dto,
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
}
