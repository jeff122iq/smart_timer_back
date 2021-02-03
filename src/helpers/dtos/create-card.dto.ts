import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateCardDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  isMainField: boolean;
}
