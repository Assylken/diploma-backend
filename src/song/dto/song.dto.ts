import { IsNotEmpty } from 'class-validator';

export class UploadSongDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  genreId: number;
}

export class AddPlays {
  @IsNotEmpty()
  songId: number;
  @IsNotEmpty()
  plays: number;
}
