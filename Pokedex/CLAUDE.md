# Pokédex con PokéAPI

Aplicación web tipo Pokédex construida con React + Vite + TypeScript consumiendo la PokéAPI.

## Stack
- React + Vite + TypeScript
- React Router DOM
- Fetch nativo
- localStorage (pendiente)

## Estructura del proyecto
```
Pokedex/pokedex/src/
  components/     # componentes reutilizables (pendiente)
  pages/          # HomePage.tsx (completo)
  services/       # pokemonService.ts (completo)
  hooks/          # (pendiente)
  types/          # pokemon.ts (completo)
  utils/          # (pendiente)
  storage/        # (pendiente)
```

## Progreso

### Clase 1 — COMPLETA
- [x] Proyecto base con Vite + React + TypeScript
- [x] Instalación de React Router
- [x] Estructura de carpetas creada
- [x] Tipos TypeScript en `src/types/pokemon.ts`
- [x] Servicio de API en `src/services/pokemonService.ts`
- [x] `HomePage.tsx` con listado de 20 Pokémon, sprites y manejo de estados
- [x] `App.tsx` y `main.tsx` configurados

### Clase 2 — PENDIENTE
- [ ] Componente reutilizable `PokemonCard`
- [ ] Navegación con React Router hacia pantalla de detalle
- [ ] `DetailPage.tsx` con imagen, tipos, peso, altura, habilidades y estadísticas

### Clase 3 — PENDIENTE
- [ ] Búsqueda por nombre
- [ ] Filtro por tipo
- [ ] Sistema de favoritos con persistencia en localStorage
- [ ] Estados de carga, error y sin resultados

### Clase 4 — PENDIENTE
- [ ] Comparador de dos Pokémon
- [ ] Pulir diseño y responsividad
- [ ] README final
- [ ] Demo

## Preferencias del usuario
- El usuario escribe su propio código; solo dar instrucciones de qué hacer y dónde.
- Explicar conceptos cuando el usuario los pide o no los entiende.
- No agregar Co-Authored-By en commits.
