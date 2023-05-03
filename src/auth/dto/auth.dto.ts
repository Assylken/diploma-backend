import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @Transform((param) => param.value.toLowerCase())
  username: string;
  @IsEmail()
  @IsNotEmpty()
  @Transform((param) => param.value.toLowerCase())
  email: string;
  @IsOptional()
  isArtist: boolean;
  @IsNotEmpty()
  countryId: number;
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LoginDto {
  @IsNotEmpty()
  usernameOrEmail: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
