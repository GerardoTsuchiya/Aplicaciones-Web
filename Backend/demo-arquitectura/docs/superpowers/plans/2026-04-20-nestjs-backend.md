# NestJS Backend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar el backend Express con una aplicación NestJS que expone los mismos endpoints de usuarios y la estructura vacía del módulo todos.

**Architecture:** NestJS con módulos independientes `usuarios` y `todos`. Los datos de usuarios se mantienen en un arreglo en memoria dentro del service. El módulo `todos` tiene la estructura completa pero sin lógica implementada. El frontend no requiere cambios.

**Tech Stack:** NestJS 10, TypeScript, class-validator, class-transformer, Jest (tests unitarios del service)

---

### Task 1: Limpiar Backend/ y crear estructura base NestJS

**Files:**
- Delete: `Backend/index.js`
- Delete: `Backend/package.json`
- Delete: `Backend/package-lock.json`
- Delete: `Backend/node_modules/`
- Create: `Backend/package.json`
- Create: `Backend/tsconfig.json`
- Create: `Backend/nest-cli.json`
- Create: `Backend/.env`
- Create: `Backend/src/main.ts`
- Create: `Backend/src/app.module.ts`

- [ ] **Step 1: Eliminar archivos del Express**

```bash
cd Backend
rm -f index.js package.json package-lock.json
rm -rf node_modules
```

- [ ] **Step 2: Crear `Backend/package.json`**

```json
{
  "name": "demo-nestjs",
  "version": "0.0.1",
  "scripts": {
    "start": "nest start",
    "start:dev": "nest start --watch",
    "build": "nest build",
    "test": "jest"
  },
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/platform-express": "^10.0.0",
    "@nestjs/mapped-types": "*",
    "class-validator": "^0.14.0",
    "class-transformer": "^0.5.0",
    "reflect-metadata": "^0.2.0",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.0.0",
    "@nestjs/schematics": "^10.0.0",
    "@nestjs/testing": "^10.0.0",
    "@types/jest": "^29.5.2",
    "@types/node": "^20.3.1",
    "jest": "^29.5.0",
    "ts-jest": "^29.1.0",
    "typescript": "^5.1.3"
  },
  "jest": {
    "moduleFileExtensions": ["js", "json", "ts"],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": { "^.+\\.(t|j)s$": "ts-jest" },
    "testEnvironment": "node"
  }
}
```

- [ ] **Step 3: Crear `Backend/tsconfig.json`**

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2021",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": false,
    "noImplicitAny": false
  }
}
```

- [ ] **Step 4: Crear `Backend/nest-cli.json`**

```json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true
  }
}
```

- [ ] **Step 5: Crear `Backend/.env`**

```
PORT=3000
```

- [ ] **Step 6: Instalar dependencias**

```bash
npm install
```

Esperado: carpeta `node_modules/` creada sin errores.

- [ ] **Step 7: Crear `Backend/src/main.ts`**

```typescript
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

- [ ] **Step 8: Crear `Backend/src/app.module.ts`**

```typescript
import { Module } from '@nestjs/common';

@Module({
  imports: [],
})
export class AppModule {}
```

- [ ] **Step 9: Verificar que el servidor arranca**

```bash
npm run start:dev
```

Esperado: `Nest application successfully started` en el log, servidor en `http://localhost:3000`.

- [ ] **Step 10: Commit**

```bash
cd ..
git add Backend/
git commit -m "feat: inicializar proyecto NestJS en Backend"
```

---

### Task 2: Entidad y DTOs de usuarios

**Files:**
- Create: `Backend/src/usuarios/entities/usuario.entity.ts`
- Create: `Backend/src/usuarios/dto/create-usuario.dto.ts`
- Create: `Backend/src/usuarios/dto/update-usuario.dto.ts`

- [ ] **Step 1: Crear `Backend/src/usuarios/entities/usuario.entity.ts`**

```typescript
export class Usuario {
  id: number;
  nombre: string;
  apellido: string;
}
```

- [ ] **Step 2: Crear `Backend/src/usuarios/dto/create-usuario.dto.ts`**

```typescript
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;
}
```

- [ ] **Step 3: Crear `Backend/src/usuarios/dto/update-usuario.dto.ts`**

```typescript
import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {}
```

- [ ] **Step 4: Commit**

```bash
git add Backend/src/usuarios/
git commit -m "feat: agregar entidad y DTOs de usuarios"
```

---

### Task 3: Service de usuarios (TDD)

**Files:**
- Create: `Backend/src/usuarios/usuarios.service.spec.ts`
- Create: `Backend/src/usuarios/usuarios.service.ts`

- [ ] **Step 1: Crear el test `Backend/src/usuarios/usuarios.service.spec.ts`**

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

describe('UsuariosService', () => {
  let service: UsuariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuariosService],
    }).compile();
    service = module.get<UsuariosService>(UsuariosService);
  });

  it('findAll retorna objeto con propiedad data', () => {
    const result = service.findAll();
    expect(result).toHaveProperty('data');
    expect(Array.isArray(result.data)).toBe(true);
  });

  it('findOne retorna usuario existente', () => {
    const result = service.findOne(1);
    expect(result.data.id).toBe(1);
  });

  it('findOne lanza NotFoundException si el id no existe', () => {
    expect(() => service.findOne(9999)).toThrow(NotFoundException);
  });

  it('create agrega un usuario y lo retorna', () => {
    const antes = service.findAll().data.length;
    service.create({ nombre: 'Test', apellido: 'User' });
    expect(service.findAll().data.length).toBe(antes + 1);
  });

  it('update modifica campos parcialmente', () => {
    service.update(1, { nombre: 'Nuevo' });
    const result = service.findOne(1);
    expect(result.data.nombre).toBe('Nuevo');
  });

  it('replace reemplaza todos los campos', () => {
    service.replace(1, { nombre: 'Completo', apellido: 'Reemplazado' });
    const result = service.findOne(1);
    expect(result.data.nombre).toBe('Completo');
    expect(result.data.apellido).toBe('Reemplazado');
  });

  it('remove elimina el usuario', () => {
    const antes = service.findAll().data.length;
    service.remove(1);
    expect(service.findAll().data.length).toBe(antes - 1);
  });
});
```

- [ ] **Step 2: Ejecutar el test para verificar que falla**

```bash
cd Backend && npm run test -- --testPathPattern=usuarios.service
```

Esperado: `FAIL` — `Cannot find module './usuarios.service'`.

- [ ] **Step 3: Crear `Backend/src/usuarios/usuarios.service.ts`**

```typescript
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
```

- [ ] **Step 4: Ejecutar el test para verificar que pasa**

```bash
npm run test -- --testPathPattern=usuarios.service
```

Esperado:
```
PASS  src/usuarios/usuarios.service.spec.ts
  UsuariosService
    ✓ findAll retorna objeto con propiedad data
    ✓ findOne retorna usuario existente
    ✓ findOne lanza NotFoundException si el id no existe
    ✓ create agrega un usuario y lo retorna
    ✓ update modifica campos parcialmente
    ✓ replace reemplaza todos los campos
    ✓ remove elimina el usuario

Tests: 7 passed, 7 total
```

- [ ] **Step 5: Commit**

```bash
cd ..
git add Backend/src/usuarios/
git commit -m "feat: agregar service de usuarios con CRUD en memoria"
```

---

### Task 4: Controller, módulo de usuarios y registro en AppModule

**Files:**
- Create: `Backend/src/usuarios/usuarios.controller.ts`
- Create: `Backend/src/usuarios/usuarios.module.ts`
- Modify: `Backend/src/app.module.ts`

- [ ] **Step 1: Crear `Backend/src/usuarios/usuarios.controller.ts`**

```typescript
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.findOne(id);
  }

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @Put(':id')
  replace(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUsuarioDto: CreateUsuarioDto,
  ) {
    return this.usuariosService.replace(id, createUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.remove(id);
  }
}
```

- [ ] **Step 2: Crear `Backend/src/usuarios/usuarios.module.ts`**

```typescript
import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
```

- [ ] **Step 3: Actualizar `Backend/src/app.module.ts`**

```typescript
import { Module } from '@nestjs/common';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [UsuariosModule],
})
export class AppModule {}
```

- [ ] **Step 4: Verificar que el servidor arranca y los endpoints funcionan**

```bash
cd Backend && npm run start:dev
```

En otra terminal (o con curl / Postman):
```bash
curl http://localhost:3000/usuarios
```
Esperado: `{"data":[{"id":1,"nombre":"Alice",...}]}`

- [ ] **Step 5: Commit**

```bash
cd ..
git add Backend/src/
git commit -m "feat: agregar controller y módulo de usuarios"
```

---

### Task 5: Módulo todos (estructura vacía) y registro en AppModule

**Files:**
- Create: `Backend/src/todos/entities/todo.entity.ts`
- Create: `Backend/src/todos/dto/create-todo.dto.ts`
- Create: `Backend/src/todos/todos.service.ts`
- Create: `Backend/src/todos/todos.controller.ts`
- Create: `Backend/src/todos/todos.module.ts`
- Modify: `Backend/src/app.module.ts`

- [ ] **Step 1: Crear `Backend/src/todos/entities/todo.entity.ts`**

```typescript
export class Todo {
  id: number;
  titulo: string;
  completado: boolean;
}
```

- [ ] **Step 2: Crear `Backend/src/todos/dto/create-todo.dto.ts`**

```typescript
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsBoolean()
  completado: boolean;
}
```

- [ ] **Step 3: Crear `Backend/src/todos/todos.service.ts`**

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class TodosService {}
```

- [ ] **Step 4: Crear `Backend/src/todos/todos.controller.ts`**

```typescript
import { Controller } from '@nestjs/common';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}
}
```

- [ ] **Step 5: Crear `Backend/src/todos/todos.module.ts`**

```typescript
import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';

@Module({
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
```

- [ ] **Step 6: Actualizar `Backend/src/app.module.ts` para incluir TodosModule**

```typescript
import { Module } from '@nestjs/common';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [UsuariosModule, TodosModule],
})
export class AppModule {}
```

- [ ] **Step 7: Verificar que el servidor compila sin errores**

```bash
cd Backend && npm run start:dev
```

Esperado: `Nest application successfully started` sin errores de compilación.

- [ ] **Step 8: Ejecutar todos los tests**

```bash
npm run test
```

Esperado: `Tests: 7 passed, 7 total`

- [ ] **Step 9: Commit final**

```bash
cd ..
git add Backend/src/
git commit -m "feat: agregar módulo todos con estructura vacía"
```
