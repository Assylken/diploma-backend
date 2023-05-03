import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { SongModule } from './song/song.module';
import { GenreModule } from './genre/genre.module';
import { CountryModule } from './country/country.module';
import { PlaylistModule } from './playlist/playlist.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    SongModule,
    GenreModule,
    CountryModule,
    PrismaModule,
    PlaylistModule,
  ],
})
export class AppModule {}
