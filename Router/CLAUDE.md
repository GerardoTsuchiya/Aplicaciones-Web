# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server with HMR at localhost:5173
npm run build     # Type-check + production build (tsc -b && vite build)
npm run lint      # Run ESLint
npm run preview   # Preview production build locally
```

## Architecture

React 19 + TypeScript SPA using react-router v7. Built with Vite 8.

- **Entry:** `src/main.tsx` → wraps `<App>` in `<BrowserRouter>`
- **Routes:** `src/App.tsx` — all route definitions live here
- **Pages:** `pages/` — `Home`, `Perfil`, `Config`, `Detalles`
- **Components:** `components/Navegacion.tsx` — shared nav bar using `<NavLink>` with active class support
- **Build:** React Compiler (Babel preset) is enabled in `vite.config.ts` for automatic memoization — avoid manual `useMemo`/`useCallback` unless profiling shows a need
- **TypeScript:** Strict mode with `noUnusedLocals` and `noUnusedParameters` enforced

## Route Structure

```
/                     → Home (index)
/perfil               → Perfil (index under /perfil)
/perfil/detalles/:id  → Detalles (sibling of Perfil, replaces it)
/config               → Config
```

`/perfil` and `/perfil/detalles/:id` are siblings under a pathless parent — navigating to `detalles` replaces `Perfil` entirely (no `<Outlet>` needed).

## Git Workflow

After completing any meaningful change, commit and push to `origin master` from the `Aplicaciones_Web` root (the parent repo that tracks this project). Do this proactively without waiting for the user to ask.

## Key Notes

- The project uses react-router v7 (not v6) — the API differs (e.g., `createBrowserRouter`, `RouterProvider`, file-based routing support)
- ESLint uses flat config format (v9+)
- No test framework is configured
