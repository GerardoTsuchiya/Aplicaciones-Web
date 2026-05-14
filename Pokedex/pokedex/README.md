# Pokédex con PokéAPI

**Materia:** Aplicaciones Web  
**Fecha inicio:** 2026-05-12  
**Stack:** React + Vite + TypeScript + React Router  
**API:** https://pokeapi.co/api/v2  
**Repo:** Aplicaciones_Web/Pokedex/pokedex/

---

## Progreso por clase

### Clase 1 — Completada ✅
**Objetivo:** Estructura base y primer consumo de API

Archivos creados:
- `src/types/pokemon.ts` — interfaces TypeScript
- `src/services/pokemonService.ts` — funciones de fetch
- `src/pages/HomePage.tsx` — listado de 20 Pokémon con sprites
- `src/App.tsx` y `src/main.tsx` — entrada de la app

**Entregable:** 20 Pokémon visibles en pantalla con nombre e imagen.

### Clase 2 — Completada ✅
**Objetivo:** Componentes reutilizables, navegación y pantalla de detalle

Archivos creados/modificados:
- `src/components/PokemonCard.tsx` — tarjeta reutilizable que hace su propio fetch para obtener tipos, imagen y número
- `src/pages/DetailPage.tsx` — pantalla de detalle con imagen, tipos, peso, altura, habilidades y estadísticas base
- `src/App.tsx` — React Router configurado con rutas `/` y `/pokemon/:id`
- `src/pages/HomePage.tsx` — actualizado para usar `PokemonCard` en lugar de `<li>` inline

**Entregable:** Listado con tarjetas completas (RF01) y pantalla de detalle funcional (RF02) con navegación entre ambas.

### Clase 3 — Pendiente
Búsqueda, filtros por tipo, favoritos con localStorage.

### Clase 4 — Pendiente
Comparador de estadísticas, diseño final, demo.

---

## Historial de commits

| Hash | Mensaje |
|------|---------|
| `717568e` | feat: creación de estructura base e instalación de dependencias base |
| `f995d56` | feat(clase1): tipos, servicio y listado inicial de 20 pokémon |
| `cdc0a6c` | docs(pokedex): reemplazar README de Vite con nota del proyecto |
| `3d32fd1` | Aplicaciones-Web Clase 2: componentes, detalle y navegación (asistido) |

