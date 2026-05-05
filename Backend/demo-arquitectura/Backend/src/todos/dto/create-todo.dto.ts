import { IsString, IsNotEmpty, IsBoolean, IsInt, IsOptional } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsBoolean()
  @IsOptional()
  completado?: boolean;

  @IsInt()
  usuarioId: number;
}
