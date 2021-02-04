import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCardDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  isMainField: boolean;
}
