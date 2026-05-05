# Backend - demo-arquitectura

API REST construida con NestJS, Prisma y PostgreSQL. Expone recursos para `usuarios` y `todos`, valida los datos de entrada con DTOs y persiste la informacion mediante Prisma Client.

## Stack

- NestJS 10
- TypeScript
- Prisma 7
- PostgreSQL 16
- Docker Compose
- class-validator / class-transformer

## Instalacion

```bash
npm install
```

Crea un archivo `.env` local:

```env
DATABASE_URL="postgresql://Tusk:Tusk3110@localhost:5432/demo_arquitectura"
PORT=3000
```

Levanta la base de datos:

```bash
docker compose up -d
```

Aplica migraciones:

```bash
npx prisma migrate dev
```

Inicia el servidor:

```bash
npm run start:dev
```

La API corre en `http://localhost:3000`.

## Estructura

```txt
src/
├── app.module.ts
├── main.ts
├── prisma/
│   ├── prisma.module.ts
│   └── prisma.service.ts
├── todos/
│   ├── dto/
│   ├── entities/
│   ├── todos.controller.ts
│   ├── todos.module.ts
│   └── todos.service.ts
└── usuarios/
    ├── dto/
    ├── entities/
    ├── usuarios.controller.ts
    ├── usuarios.module.ts
    └── usuarios.service.ts
```

## Arranque de la app

`src/main.ts` crea la aplicacion NestJS, habilita CORS para `http://localhost:5173`, activa `ValidationPipe` de forma global y escucha en `PORT` o `3000`.

`src/app.module.ts` registra:

- `PrismaModule`
- `UsuariosModule`
- `TodosModule`

## Prisma

`src/prisma/prisma.service.ts` extiende `PrismaClient`, crea un pool PostgreSQL con `DATABASE_URL` y conecta al iniciar el modulo.

El esquema vive en:

```txt
prisma/schema.prisma
```

Modelos:

- `Usuario`: datos basicos del usuario y relacion con tareas.
- `Todo`: tareas asociadas a un usuario por `usuarioId`.

## Endpoints

### Usuarios

| Metodo | Ruta | Descripcion |
|---|---|---|
| GET | `/usuarios` | Lista usuarios |
| GET | `/usuarios/:id` | Obtiene usuario por ID |
| POST | `/usuarios` | Crea usuario |
| PATCH | `/usuarios/:id` | Actualiza campos parciales |
| PUT | `/usuarios/:id` | Reemplaza datos del usuario |
| DELETE | `/usuarios/:id` | Elimina usuario |

Ejemplo de creacion:

```bash
curl -X POST http://localhost:3000/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Diana","apellido":"Lopez","email":"diana@example.com"}'
```

### Todos

| Metodo | Ruta | Descripcion |
|---|---|---|
| GET | `/todos` | Lista tareas |
| GET | `/todos/:id` | Obtiene tarea por ID |
| POST | `/todos` | Crea tarea |
| PATCH | `/todos/:id` | Actualiza campos parciales |
| DELETE | `/todos/:id` | Elimina tarea |

Ejemplo de creacion:

```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Estudiar NestJS","descripcion":"Repasar modulos y servicios","usuarioId":1}'
```

## Scripts

```bash
npm run start       # inicia NestJS
npm run start:dev   # inicia con watch mode
npm run build       # compila el proyecto
npm run test        # ejecuta Jest
```

## Notas

- `.env` no debe subirse al repositorio.
- Las migraciones de Prisma estan en `prisma/migrations`.
- Si PostgreSQL no esta activo o `DATABASE_URL` es incorrecto, el backend no podra iniciar correctamente.
