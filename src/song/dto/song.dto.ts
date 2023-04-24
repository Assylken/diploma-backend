import { IsNotEmpty } from 'class-validator';

export class UploadSongDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  genreId: number;
}
