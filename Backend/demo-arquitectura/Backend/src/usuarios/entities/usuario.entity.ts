import { IsDate, IsEmail, IsInt, IsOptional, IsString, Min } from 'class-validator';

export interface Todo {
  id: number;
  titulo: string;
  descripcion: string;
  completado: boolean;
}

export class Usuario {
  @IsInt({ message: 'El id debe ser un número entero' })
  id: number;

  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  nombre: string;

  @IsString({ message: 'El apellido debe ser una cadena de texto' })
  apellido: string;

  @IsEmail()
  @IsString({ message: 'El email debe ser una cadena de texto' })
  email: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date | null = new Date();

  @IsOptional()
  todos!: Todo[] | null;
}
