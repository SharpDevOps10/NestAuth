import { ValidationOptions } from 'class-validator';

export function validationOptionsMsg (message:string): ValidationOptions {
  return { message };
}