# demo-arquitectura

Proyecto full stack de practica universitaria para la materia Aplicaciones Web. El repositorio muestra una arquitectura separada entre un backend REST con NestJS y un frontend SPA con React, conectados por HTTP y respaldados por PostgreSQL.

## Stack

### Backend

- NestJS 10
- TypeScript
- Prisma 7
- PostgreSQL 16
- class-validator / class-transformer
- Docker Compose para la base de datos local

### Frontend

- React 19
- Vite 8
- TypeScript
- TanStack Query
- Tailwind CSS v4
- shadcn/ui, Radix UI y lucide-react

## Estructura

```txt
demo-arquitectura/
├── Backend/
│   ├── docker-compose.yml
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   └── src/
│       ├── prisma/
│       ├── todos/
│       ├── usuarios/
│       ├── app.module.ts
│       └── main.ts
├── Frontend/
│   └── src/
│       ├── components/ui/
│       ├── hooks/
│       ├── App.tsx
│       └── main.tsx
└── README.md
```

Cada carpeta principal tiene su propio `package.json`; el backend y el frontend se instalan y ejecutan por separado.

## Requisitos

- Node.js
- npm
- Docker Desktop o un servidor PostgreSQL compatible

## Configuracion del backend

Entra a la carpeta del backend:

```bash
cd Backend
npm install
```

Crea un archivo `.env` local con:

```env
DATABASE_URL="postgresql://Tusk:Tusk3110@localhost:5432/demo_arquitectura"
PORT=3000
```

Levanta PostgreSQL:

```bash
docker compose up -d
```

Aplica las migraciones de Prisma:

```bash
npx prisma migrate dev
```

Inicia NestJS en modo desarrollo:

```bash
npm run start:dev
```

La API queda disponible en:

```txt
http://localhost:3000
```

## Configuracion del frontend

En otra terminal:

```bash
cd Frontend
npm install
npm run dev
```

La app queda disponible en:

```txt
http://localhost:5173
```

El backend tiene CORS configurado para aceptar peticiones desde `http://localhost:5173`.

## Modelo de datos

Prisma define dos modelos principales:

```txt
Usuario
- id
- nombre
- apellido
- email
- createdAt
- todos

Todo
- id
- titulo
- descripcion
- completado
- usuarioId
- usuario
- createdAt
```

La relacion es uno a muchos: un `Usuario` puede tener muchos `Todo`, y cada `Todo` pertenece a un `Usuario`.

## Endpoints

### Usuarios

| Metodo | Ruta | Descripcion |
|---|---|---|
| GET | `/usuarios` | Lista usuarios |
| GET | `/usuarios/:id` | Obtiene un usuario por ID |
| POST | `/usuarios` | Crea un usuario |
| PATCH | `/usuarios/:id` | Actualiza parcialmente un usuario |
| PUT | `/usuarios/:id` | Reemplaza un usuario |
| DELETE | `/usuarios/:id` | Elimina un usuario |

### Todos

| Metodo | Ruta | Descripcion |
|---|---|---|
| GET | `/todos` | Lista tareas |
| GET | `/todos/:id` | Obtiene una tarea por ID |
| POST | `/todos` | Crea una tarea |
| PATCH | `/todos/:id` | Actualiza parcialmente una tarea |
| DELETE | `/todos/:id` | Elimina una tarea |

## Flujo de la aplicacion

1. React renderiza la tabla de usuarios desde `Frontend/src/App.tsx`.
2. Los hooks de `Frontend/src/hooks/usuarios.hook.ts` hacen `fetch` a la API en `http://localhost:3000`.
3. NestJS recibe la peticion en los controladores de `usuarios` o `todos`.
4. Los servicios llaman a Prisma para consultar o modificar PostgreSQL.
5. TanStack Query invalida y recarga la lista despues de crear, editar o eliminar.

## Notas actuales

- El README anterior describia una version con Express; el proyecto actual usa NestJS.
- El archivo `.env` debe mantenerse local y no subirse al repo.
- El backend valida `email` al crear usuarios. Si el formulario del frontend no envia `email`, la creacion de usuarios fallara hasta ajustar esa parte.
