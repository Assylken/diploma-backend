import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

const cookieExtractor = (request: Request) => {
  const data = request?.cookies['access_token'];
  if (!data) {
    return null;
  }
  return data;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private prisma: PrismaService, config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // Take jwt from http header
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        // Take jwt from cookie
        cookieExtractor,
      ]),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: { sub: number; walletAddress: string }) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });
    return user;
  }
}
