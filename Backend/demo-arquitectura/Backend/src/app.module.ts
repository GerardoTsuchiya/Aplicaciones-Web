import { Module } from '@nestjs/common';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [UsuariosModule, TodosModule],
})
export class AppModule {}
