import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { EditUserDto, UserWalletAddress } from './dto';
import { UserService } from './user.service';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

export const storage = {
  storage: diskStorage({
    destination: './uploads/profileImages',
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

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @UseGuards(JwtGuard)
  @Patch('edit')
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }

  @UseGuards(JwtGuard)
  @Patch('addWallet')
  addWalletAddress(
    @GetUser('id') userId: number,
    @Body() dto: UserWalletAddress,
  ) {
    return this.userService.addWalletAddress(userId, dto);
  }

  @Get('getUsername/:id')
  getUsername(@Param('id') id) {
    return this.userService.getUsername(+id);
  }

  @Get('getTopArtists')
  getTopArtists() {
    return this.userService.getTopArtists();
  }

  @UseGuards(JwtGuard)
  @Patch('upload')
  @UseInterceptors(FileInterceptor('profileImage', storage))
  uploadImage(
    @GetUser('id') userId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('File is not an image');
    } else {
      return this.userService.editImage(
        userId,
        `https://muze-backend.onrender.com/users/images/${file.filename}`,
      );
    }
  }

  @Get('images/:filename')
  async getImage(@Param('filename') filename, @Res() res: Response) {
    res.sendFile(filename, { root: 'uploads/profileImages' });
  }
}
