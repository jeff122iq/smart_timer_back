import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCardsTagsDTO {
  @IsNotEmpty()
  @IsNumber()
  tag: number;

  @IsNotEmpty()
  @IsNumber()
  card: number;
}
