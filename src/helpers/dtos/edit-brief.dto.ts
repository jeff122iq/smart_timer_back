import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class EditBriefDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  name: string;
}
