import { IsString, Length } from 'class-validator';

export class RequestCategoryDto {
  @IsString()
  @Length(3, 25)
  name: string;
}

export class ResponseCategoryDto {
  id: string;
  name: string;
}
