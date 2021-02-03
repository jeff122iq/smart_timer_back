import { IsNotEmpty, IsString } from 'class-validator';

export class EditCardDTO {
  @IsNotEmpty()
  id: number;

  title: string;
  description: string;
  isMainField: boolean;
}
