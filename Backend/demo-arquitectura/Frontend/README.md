# Frontend — demo-arquitectura

SPA construida con React 19 + Vite + TypeScript que consume la API REST del backend (`demo-express`).

## Stack

- **React 19** — UI library
- **Vite 8** — bundler y dev server con HMR
- **TypeScript** — tipado estático
- **TanStack Query** — gestión de estado del servidor (fetch, caché, revalidación)

## Correr el proyecto

```bash
npm install
npm run dev      # dev server en http://localhost:5173
npm run build    # verificación de tipos + build de producción
npm run preview  # sirve el build localmente
```

> El backend debe estar corriendo en `http://localhost:3000` para que el fetch funcione.

## Estructura

```
src/
├── hooks/
│   └── usuarios.hook.ts  ← useUsuarios: useQuery encapsulado con interfaces tipadas
├── App.tsx               ← componente raíz
└── main.tsx              ← monta la app con QueryClientProvider
```
