import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PlaylistDTO {
  @IsString()
  @IsNotEmpty()
  playlist_name: string;
  @IsString()
  @IsOptional()
  playlist_description: string;
  @IsOptional()
  playlist_avatar: string;
  @IsOptional()
  isPrivate: boolean;
}

export class AddSongToPlaylistDTO {
  @IsNotEmpty()
  playlistId: number;
  @IsNotEmpty()
  songId: number;
}

export class DeleteSongFromPlaylistDTO {
  @IsNotEmpty()
  playlistId: number;
  @IsNotEmpty()
  songId: number;
}

export class DeletePlaylistDTO {
  @IsNotEmpty()
  playlistId: number;
}
