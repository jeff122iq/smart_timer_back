import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTemplatesTagsDTO {
  @IsNotEmpty()
  @IsNumber()
  tag: number;

  @IsNotEmpty()
  @IsNumber()
  template: number;
}
