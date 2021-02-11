import { CreateCardDTO } from './create-card.dto';
import { IsNotEmpty, IsString, IsNumber, IsArray } from 'class-validator';

export class CreateBriefDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsArray()
  @IsNotEmpty()
  cards: Array<CreateCardDTO>;
}
