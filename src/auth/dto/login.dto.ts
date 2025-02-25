import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: "Format d'email invalide" })
  @IsNotEmpty({ message: "L'email est requis" })
  @Transform(({ value }): string => String(value).toLowerCase().trim())
  email!: string;

  @IsNotEmpty({ message: 'Le mot de passe est requis' })
  @MinLength(6, {
    message: 'Le mot de passe doit contenir au moins 6 caractères',
  })
  @MaxLength(50, {
    message: 'Le mot de passe ne peut pas dépasser 50 caractères',
  })
  @Transform(({ value }): string => String(value))
  password!: string;
}
