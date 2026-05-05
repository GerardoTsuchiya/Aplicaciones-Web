# Frontend - demo-arquitectura

SPA construida con React, Vite y TypeScript. Consume la API REST del backend NestJS y usa TanStack Query para manejar estado del servidor, cache e invalidacion de consultas.

## Stack

- React 19
- Vite 8
- TypeScript
- TanStack Query
- Tailwind CSS v4
- shadcn/ui
- Radix UI
- lucide-react

## Instalacion

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

La app corre en:

```txt
http://localhost:5173
```

El backend debe estar activo en:

```txt
http://localhost:3000
```

## Estructura

```txt
src/
├── App.tsx
├── main.tsx
├── index.css
├── hooks/
│   └── usuarios.hook.ts
├── lib/
│   └── utils.ts
└── components/
    └── ui/
        ├── button.tsx
        ├── card.tsx
        ├── dialog.tsx
        ├── dropdown-menu.tsx
        ├── field.tsx
        ├── input.tsx
        ├── label.tsx
        ├── separator.tsx
        └── table.tsx
```

## Flujo de datos

`src/main.tsx` crea un `QueryClient` y envuelve la app con `QueryClientProvider`.

`src/hooks/usuarios.hook.ts` concentra las llamadas HTTP a `http://localhost:3000/usuarios`:

- `useUsuarios`: lista usuarios.
- `useAgregarUsuario`: crea usuarios.
- `useEliminarUsuario`: elimina usuarios.
- `useEditarUsuario`: actualiza usuarios.

Despues de crear, editar o eliminar, los hooks invalidan la consulta `getUsuarios` para refrescar la tabla.

`src/App.tsx` renderiza:

- tabla de usuarios,
- boton para actualizar,
- formulario para agregar usuario,
- menu de acciones por fila,
- dialogo para editar usuario.

## Scripts

```bash
npm run dev      # servidor de desarrollo
npm run build    # verificacion de tipos y build de produccion
npm run lint     # ESLint
npm run preview  # sirve el build local
```

## Notas

- La URL del backend esta definida en `src/hooks/usuarios.hook.ts`.
- El backend actual exige `email` al crear usuarios. Si el formulario no envia ese campo, la mutacion de creacion fallara hasta ajustar la UI o el DTO del backend.
- Los componentes shadcn/ui estan copiados dentro de `src/components/ui` y se pueden editar directamente.
