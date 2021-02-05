import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBriefsCardsDTO {
  @IsNotEmpty()
  @IsNumber()
  template: number;

  @IsNotEmpty()
  @IsNumber()
  card: number;

  @IsNotEmpty()
  @IsNumber()
  serial_num: number;
}
