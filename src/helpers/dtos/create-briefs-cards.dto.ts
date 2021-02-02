import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBriefsCardsDTO {
  @IsNotEmpty()
  @IsNumber()
  brief: number;

  @IsNotEmpty()
  @IsNumber()
  card: number;

  @IsNotEmpty()
  @IsNumber()
  serial_num: number;
}
