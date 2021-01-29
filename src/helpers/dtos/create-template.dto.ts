import { IsNotEmpty } from 'class-validator';

export class CreateTemplateDTO {
  @IsNotEmpty()
  name: string;
}
