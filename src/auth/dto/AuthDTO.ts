import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class AuthDTO {
  @IsEmail({})
  @IsNotEmpty()
    email: string;

  @IsNotEmpty()
  @IsString()
    password: string;
}