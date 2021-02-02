import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCategoriesTagsDTO {
  @IsNotEmpty()
  @IsNumber()
  category: number;

  @IsNotEmpty()
  @IsNumber()
  tag: number;
}
