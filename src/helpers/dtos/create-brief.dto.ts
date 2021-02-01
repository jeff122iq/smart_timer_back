import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateBriefDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  user: number;
}
