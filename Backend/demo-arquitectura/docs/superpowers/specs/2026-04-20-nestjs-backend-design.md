# NestJS Backend — Diseño

**Fecha:** 2026-04-20  
**Estado:** Aprobado

## Contexto

El proyecto `demo-arquitectura` tiene un backend Express.js (`Backend/index.js`) con CRUD de usuarios en memoria, y un frontend React + Vite + shadcn/ui que lo consume en `localhost:3000`. El profesor usa NestJS con módulos `usuarios` y `todos`, por lo que NestJS reemplaza Express en la carpeta `Backend/`.

## Decisiones

- NestJS reemplaza Express dentro de `Backend/` (se elimina `index.js` y `package.json` actuales)
- Datos en memoria (arreglo en el service) — sin base de datos por ahora
- Puerto desde `.env` (`PORT=3000`) para mantener compatibilidad con el frontend sin cambios
- CORS habilitado en `main.ts` para `localhost:5173`

## Estructura de carpetas

```
Backend/
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   ├── usuarios/
│   │   ├── entities/
│   │   │   └── usuario.entity.ts
│   │   ├── dto/
│   │   │   ├── create-usuario.dto.ts
│   │   │   └── update-usuario.dto.ts
│   │   ├── usuarios.controller.ts
│   │   ├── usuarios.service.ts
│   │   └── usuarios.module.ts
│   └── todos/
│       ├── entities/
│       │   └── todo.entity.ts
│       ├── dto/
│       │   └── create-todo.dto.ts
│       ├── todos.controller.ts
│       ├── todos.service.ts
│       └── todos.module.ts
├── .env
├── package.json
└── tsconfig.json
```

## Módulo `usuarios` — CRUD completo

Endpoints (mismos que Express para no romper el frontend):

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /usuarios | Lista todos |
| GET | /usuarios/:id | Uno por id |
| POST | /usuarios | Crear |
| PATCH | /usuarios/:id | Edición parcial |
| PUT | /usuarios/:id | Edición completa |
| DELETE | /usuarios/:id | Eliminar |

- `usuario.entity.ts` — clase con `id: number`, `nombre: string`, `apellido: string`
- `create-usuario.dto.ts` — `nombre` y `apellido` requeridos, validados con `class-validator`
- `update-usuario.dto.ts` — extiende `PartialType(CreateUsuarioDto)` para PATCH; versión completa para PUT
- `usuarios.service.ts` — arreglo en memoria, lógica de negocio
- `usuarios.controller.ts` — decoradores NestJS, delega al service
- `usuarios.module.ts` — registra controller y service

## Módulo `todos` — estructura vacía

Archivos con la forma correcta pero sin lógica implementada:

- `todo.entity.ts` — `id: number`, `titulo: string`, `completado: boolean`
- `create-todo.dto.ts` — `titulo: string`, `completado: boolean`
- `todos.service.ts` — clase vacía
- `todos.controller.ts` — clase con decorador `@Controller('todos')`, sin métodos
- `todos.module.ts` — registra controller y service

## Compatibilidad con el frontend

El frontend (`Frontend/`) no requiere cambios. Sigue consumiendo `http://localhost:3000/usuarios` con los mismos métodos HTTP y la misma forma de respuesta `{ data: [...] }` / `{ message: "...", usuario: {...} }`.
