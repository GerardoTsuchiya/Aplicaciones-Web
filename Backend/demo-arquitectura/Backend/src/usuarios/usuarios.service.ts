import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const usuarios = await this.prisma.usuario.findMany();
    return { data: usuarios };
  }

  async findOne(id: number) {
    const usuario = await this.prisma.usuario.findUnique({ where: { id } });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    return { message: 'Usuario encontrado', data: usuario };
  }

  async create(dto: CreateUsuarioDto) {
    const usuario = await this.prisma.usuario.create({ data: dto });
    return { message: 'Usuario creado', data: usuario }; 
  }

  async update(id: number, dto: UpdateUsuarioDto) {
    try {
      const usuario = await this.prisma.usuario.update({ where: { id }, data: dto });
      return { message: 'Usuario actualizado', data: usuario };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException('Usuario no encontrado');
      }
      throw error;
    }
  }

  async replace(id: number, dto: CreateUsuarioDto) {
    try {
      const usuario = await this.prisma.usuario.update({ where: { id }, data: dto });
      return { message: 'Usuario reemplazado', data: usuario };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException('Usuario no encontrado');
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const usuario = await this.prisma.usuario.delete({ where: { id } });
      return { message: 'Usuario eliminado', data: usuario };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException('Usuario no encontrado');
      }
      throw error;
    }
  }
}
