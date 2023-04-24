import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthDto, LoginDto } from './dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const jwtToken = await this.authService.signup(dto);

    response.cookie('access_token', jwtToken.access_token, {
      httpOnly: true,
      domain: 'localhost',
      maxAge: 1800000,
    });

    return jwtToken;
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const jwtToken = await this.authService.signin(dto);

    response.cookie('access_token', jwtToken.access_token, {
      httpOnly: true,
      domain: 'localhost',
      maxAge: 1800000,
    });

    return jwtToken;
  }

  @Post('logout')
  async signout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', {
      domain: 'localhost',
      path: '/',
    });
    return { message: 'Success' };
  }
}
