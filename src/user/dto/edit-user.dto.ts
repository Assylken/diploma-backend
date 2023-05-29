import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EditUserDto {
  @IsString()
  @IsOptional()
  firstName?: string;
  @IsString()
  @IsOptional()
  lastName?: string;
  @IsString()
  @IsOptional()
  username?: string;
  @IsString()
  @IsOptional()
  bio?: string;
  @IsString()
  @IsOptional()
  countryId?: number;
}

export class EditUserImageDto {
  @IsString()
  @IsOptional()
  profileImage?: string;
}

export class UserWalletAddress {
  @IsOptional()
  wallet_address: string;
}

export class UserSubcription {
  @IsOptional()
  id: number;
  @IsOptional()
  subscription: boolean;
}
