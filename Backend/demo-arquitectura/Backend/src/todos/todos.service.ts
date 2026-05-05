import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
    constructor (private readonly prisma: PrismaService) {}

    async findAll() {
        const todos = await this.prisma.todo.findMany();
        return { data: todos };
    }

    async findOne(id: number) {
        const todo = await this.prisma.todo.findUnique({ where: { id } });
        if (!todo) throw new NotFoundException('Todo no encontrado');
        return { message: 'Todo encontrado', data: todo };
    }

    async create(dto: CreateTodoDto) {
        const todo = await this.prisma.todo.create({ data: dto });
        return { message: 'Todo creado', data: todo }; 
    }

    async update(id: number, dto: UpdateTodoDto) {
        try {
            const todo = await this.prisma.todo.update({ where: { id }, data: dto });
            return { message: 'Todo actualizado', data: todo };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException('Todo no encontrado');
            }
            throw error;
        }
    }

    async remove(id: number) {
        try {
            const todo = await this.prisma.todo.delete({ where: { id } });
            return { message: 'Todo eliminado', data: todo };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException('Todo no encontrado');
            }
            throw error;
        }
    }
}
