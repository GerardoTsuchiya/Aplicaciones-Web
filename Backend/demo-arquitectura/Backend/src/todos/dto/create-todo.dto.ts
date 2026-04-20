import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsBoolean()
  completado: boolean;
}
