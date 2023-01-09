import { IsOptional, IsString } from 'class-validator';

export class EditUserDto {
  @IsOptional()
  username?: string;
  @IsString()
  @IsOptional()
  firstName?: string;
  @IsString()
  @IsOptional()
  lastName?: string;
}
