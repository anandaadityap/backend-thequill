import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterRequestDto {
  @IsString()
  @Length(3, 45)
  username: string;

  @IsString()
  @IsEmail()
  @Length(3, 45)
  email: string;

  @IsString()
  @Length(8, 45)
  password: string;
}

export class UserResponseDto {
  username: string;
  email: string;
  password?: string;
  role: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export class LoginRequestDto {
  @IsString()
  @IsEmail()
  @Length(3, 45)
  email: string;

  @IsString()
  @Length(8, 45)
  password: string;

  access_token?: string;
}

export class LoginResponseDto {
  access_token: string;
}

export class PayloadJwtDto {
  id: string;
  name: string;
  email: string;
  role: string;
}
