import { CreateCardDTO } from './create-card.dto';
import { IsNotEmpty, IsArray, IsNumber } from 'class-validator';

export class CreateTemplateDTO {
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsNotEmpty()
  cards: Array<number | CreateCardDTO>;
}
