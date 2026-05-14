# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite, localhost:5173)
npm run build     # TypeScript check + production build
npm run lint      # ESLint
npm run preview   # Preview production build
```

## Architecture

Single-page React app consuming [PokéAPI](https://pokeapi.co/api/v2). No backend.

```
src/
  App.tsx               # Root component — router goes here
  pages/                # One file per route/screen
  components/           # Reusable UI pieces (PokemonCard, etc.)
  services/             # All fetch logic (pokemonService.ts)
  types/                # TypeScript interfaces for API responses
  hooks/                # Custom hooks (to be created)
  storage/              # localStorage helpers (to be created)
  utils/                # Pure helpers (to be created)
```

**Data flow:** `pages/` call `services/`, which call PokéAPI directly via `fetch`. Types in `types/pokemon.ts` model the API responses. No state management library — plain `useState`/`useEffect`.

**Routing:** `react-router-dom` v7 is installed but not yet wired up in `App.tsx`. Routes should follow `/` (list) and `/pokemon/:id` (detail) and `/compare` (comparator).

**Key API endpoints used:**
- `GET /pokemon?limit=N` — paginated list (returns only name + URL, not types)
- `GET /pokemon/{id|name}` — full detail including types, stats, abilities
- `GET /type` — list of all types (for filter UI)
- `GET /type/{name}` — Pokémon belonging to a type

**Important:** The list endpoint does NOT return types. Displaying types on cards requires a per-Pokémon detail fetch.

## Project context

University assignment (Aplicaciones Web, UABC). Stack: React 19 + Vite + TypeScript + React Router v7. See `Actividad_Pokedex_PokeAPI.pdf` for full requirements. Features remaining: detail page, search, type filter, favorites (localStorage), Pokémon comparator.
