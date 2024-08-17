import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class EditUserRequestDto {
  @IsOptional()
  @IsString()
  @MaxLength(45)
  username?: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  @MaxLength(45)
  email?: string;

  @IsOptional()
  @IsString()
  biodata?: string;

  @IsOptional()
  @IsString()
  avatar_url?: string;
}

export class EditUserResponseDto {
  id: string;
  username: string;
  email: string;
  biodata?: string;
  avatar_url?: string;
  role: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
