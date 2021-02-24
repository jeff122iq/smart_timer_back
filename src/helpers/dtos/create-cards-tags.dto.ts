import { CreateCardDTO } from './create-card.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCardsTagsDTO {
  @IsNotEmpty()
  @IsNumber()
  tag: number;

  @IsNotEmpty()
  card: CreateCardDTO;
}
