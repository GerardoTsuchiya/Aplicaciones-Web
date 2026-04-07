# demo-arquitectura

Proyecto fullstack de práctica universitaria (UABC — Aplicaciones Web). Demuestra la separación entre **Backend** y **Frontend** en un mismo repositorio, comunicados a través de una API REST.

## Estructura

```
demo-arquitectura/
├── demo-express/     ← Backend: API REST con Express.js (Node.js, JavaScript)
└── Frontend/         ← Frontend: SPA con React 19 + Vite + TypeScript + TanStack Query
```

Cada carpeta es un proyecto independiente con su propio `package.json`. Se corren por separado.

---

## Backend (`demo-express/`)

API REST con CRUD completo sobre un recurso `usuarios`. Los datos se guardan en memoria (sin base de datos).

**Stack:** Node.js · Express 5 · cors · nodemon

```bash
cd demo-express
npm install
npm run dev   # http://localhost:3000
```

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/usuarios` | Lista todos los usuarios |
| `GET` | `/usuarios/:id` | Obtiene un usuario por ID |
| `POST` | `/usuarios` | Crea un usuario |
| `PATCH` | `/usuarios/:id` | Actualiza campos parcialmente |
| `PUT` | `/usuarios/:id` | Reemplaza todos los campos |
| `DELETE` | `/usuarios/:id` | Elimina un usuario |

---

## Frontend (`Frontend/`)

SPA que consume la API del backend. Usa TanStack Query para gestionar el estado del servidor (fetch, caché y revalidación) y expone la lógica en un custom hook.

**Stack:** React 19 · Vite 8 · TypeScript · TanStack Query

```bash
cd Frontend
npm install
npm run dev   # http://localhost:5173
```

### Arquitectura del Frontend

```
src/
├── hooks/
│   └── usuarios.hook.ts  ← useUsuarios: lógica de fetch encapsulada
├── App.tsx               ← componente raíz, consume useUsuarios
└── main.tsx              ← monta la app con QueryClientProvider
```

- **`useUsuarios`** — custom hook que encapsula `useQuery`. El componente solo recibe `data`, `isPending`, `isError` y `refetch`.
- **`keepPreviousData`** — mantiene la lista visible durante un refetch (sin flash de contenido vacío).
- **`QueryClientProvider`** — provee la caché de TanStack Query a toda la app desde `main.tsx`.
