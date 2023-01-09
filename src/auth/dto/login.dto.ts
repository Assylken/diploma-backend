import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  usernameOrEmail: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
