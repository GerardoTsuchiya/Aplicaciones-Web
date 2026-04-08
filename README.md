# Frontend — demo-arquitectura

SPA construida con React 19 + Vite + TypeScript que consume la API REST del backend (`demo-express`).

## Stack

- **React 19** — UI library
- **Vite 8** — bundler y dev server con HMR
- **TypeScript** — tipado estático
- **TanStack Query** — gestión de estado del servidor (fetch, caché, revalidación)
- **Tailwind CSS v4** — estilos utility-first, integrado via `@tailwindcss/vite`
- **shadcn/ui** — componentes accesibles copiados al proyecto (`src/components/ui/`)
- **Radix UI** — primitivos accesibles base de shadcn
- **lucide-react** — iconos SVG

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
├── components/
│   └── ui/
│       └── button.tsx        ← Button de shadcn con variantes cva
├── hooks/
│   └── usuarios.hook.ts      ← useUsuarios: useQuery encapsulado con interfaces tipadas
├── lib/
│   └── utils.ts              ← función cn (clsx + tailwind-merge)
├── App.tsx                   ← componente raíz
├── index.css                 ← Tailwind v4 + tokens CSS de shadcn + fuente Geist
└── main.tsx                  ← monta la app con QueryClientProvider
```

## Agregar componentes shadcn

```bash
npx shadcn@latest add <componente>
# Ejemplos:
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add dialog
```

Los componentes se copian en `src/components/ui/` y son completamente editables.
