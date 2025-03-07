import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: "Format d'email invalide" })
  @IsNotEmpty({ message: "L'email est requis" })
  email: string;

  @IsNotEmpty({ message: 'Le mot de passe est requis' })
  @IsString()
  password: string;

  @IsNotEmpty({ message: 'Le rôle est requis' })
  @IsString()
  role: string; // Nom du rôle, comme "admin" ou "user"
}
