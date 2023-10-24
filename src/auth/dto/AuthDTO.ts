import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { validationOptionsMsg } from '../../utils';
export class AuthDTO {
  @IsEmail({}, validationOptionsMsg('The email is not a valid email address'))
  @IsNotEmpty(validationOptionsMsg('Email cannot be empty'))
    email: string;

  @IsNotEmpty(validationOptionsMsg('Password cannot be empty'))
  @IsString()
    password: string;
}