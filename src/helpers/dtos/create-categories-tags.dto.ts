import { CreateTagDTO } from './create-tag.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCategoriesTagsDTO {
  @IsNotEmpty()
  @IsNumber()
  category: number;

  @IsNotEmpty()
  tag: CreateTagDTO;
}
