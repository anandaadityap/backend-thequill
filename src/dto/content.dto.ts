import { IsOptional, IsString, Length } from 'class-validator';

export class RequestContentDto {
  @IsString()
  @Length(3, 45)
  title: string;

  @IsString()
  @Length(3, 100)
  subject: string;

  @IsString()
  article: string;

  @IsString()
  @IsOptional()
  image_banner?: string;
}

export class ResponseContentDto {
  id: string;
  title: string;
  subject: string;
  article: string;
  user_id: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
