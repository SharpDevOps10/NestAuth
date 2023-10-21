import { IsEmail, IsNotEmpty } from 'class-validator';
export class AuthDTO {
  @IsEmail({})
  @IsNotEmpty()
    email: string;

  password: string;
}