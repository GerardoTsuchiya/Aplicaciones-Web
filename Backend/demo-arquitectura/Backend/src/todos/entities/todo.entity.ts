import { IsInt, IsOptional, IsString, IsBoolean, IsDate, IsNotEmpty } from 'class-validator';
import { Todo as TodoModel} from '@prisma/client';

export class Todo implements TodoModel {
  @IsInt()
  id: number;
  
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsOptional()
  descripcion: string;

  @IsBoolean()
  completado: boolean;

  @IsInt()
  @IsNotEmpty()
  usuarioId: number;

  @IsDate()
  createdAt: Date;
}
