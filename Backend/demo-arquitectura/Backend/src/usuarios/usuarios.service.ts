import { Injectable, NotFoundException } from '@nestjs/common';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  private usuarios: Usuario[] = [
    { id: 1, nombre: 'Alice', apellido: 'Smith' },
    { id: 2, nombre: 'Bob', apellido: 'Johnson' },
    { id: 3, nombre: 'Charlie', apellido: 'Brown' },
  ];

  findAll() {
    return { data: this.usuarios };
  }

  findOne(id: number) {
    const usuario = this.usuarios.find((u) => u.id === id);
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    return { message: 'Usuario encontrado', data: usuario };
  }

  create(dto: CreateUsuarioDto) {
    const usuario: Usuario = {
      id: Math.floor(Math.random() * 1000),
      nombre: dto.nombre,
      apellido: dto.apellido,
    };
    this.usuarios.push(usuario);
    return { message: 'Usuario creado', usuario };
  }

  update(id: number, dto: UpdateUsuarioDto) {
    const usuario = this.usuarios.find((u) => u.id === id);
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    if (dto.nombre) usuario.nombre = dto.nombre;
    if (dto.apellido) usuario.apellido = dto.apellido;
    return { message: 'Usuario actualizado', usuario };
  }

  replace(id: number, dto: CreateUsuarioDto) {
    const usuario = this.usuarios.find((u) => u.id === id);
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    usuario.nombre = dto.nombre;
    usuario.apellido = dto.apellido;
    return { message: 'Usuario actualizado', usuario };
  }

  remove(id: number) {
    const index = this.usuarios.findIndex((u) => u.id === id);
    if (index === -1) throw new NotFoundException('Usuario no encontrado');
    const usuario = this.usuarios[index];
    this.usuarios.splice(index, 1);
    return { message: 'Usuario eliminado', usuario };
  }
}
