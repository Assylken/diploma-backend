import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EditUserDto {
  @IsOptional()
  @IsNotEmpty()
  username?: string;
  @IsString()
  @IsOptional()
  firstName?: string;
  @IsString()
  @IsOptional()
  lastName?: string;
  @IsString()
  @IsOptional()
  bio?: string;
}
export class EditUserImageDto {
  @IsString()
  @IsOptional()
  profileImage?: string;
}
