import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsNumber,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsEmail()
  @MinLength(8)
  @MaxLength(16)
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsNumber()
  role: number;
}
