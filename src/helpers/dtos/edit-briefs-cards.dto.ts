import { IsNotEmpty, IsNumber } from 'class-validator';

export class EditBriefsCardsDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  serial_num: number;
}
