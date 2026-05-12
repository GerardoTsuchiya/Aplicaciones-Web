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

### Clase 2 — Pendiente
Componente `PokemonCard`, navegación con React Router, pantalla de detalle.

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

---

## Conceptos clave explicados

### 1. Cast de tipos con `as` — no es validación real

El operador `as` en TypeScript es solo una instrucción al compilador. No valida la respuesta en runtime.

```ts
// pokemonService.ts
const data = await response.json() as PokemonListResponse;
```

Si la API devolviera una estructura diferente, TypeScript no lo detectaría. El código compilaría igual y los errores aparecerían en runtime como `Cannot read properties of undefined`.

Sin el `as`, `data` sería de tipo `any` y TypeScript no avisaría si accedes a propiedades que no existen.

> Para validación real en runtime se usan librerías como **Zod**.

---

### 2. `useEffect` con arreglo de dependencias

```ts
// HomePage.tsx
useEffect(() => {
    async function fetchPokemons() { ... }
    fetchPokemons();
}, []); // <-- arreglo vacío
```

El `[]` vacío significa: ejecutar solo al **montar el componente** (cuando aparece en pantalla por primera vez).

- Si pusieras una variable en el arreglo: `[search]` → se ejecuta cada vez que `search` cambie.
- Si quitaras el `[]` completamente → se ejecutaría después de cada render, causando un loop infinito porque el efecto llama a `setPokemons`, que provoca un render, que vuelve a ejecutar el efecto.

---

### 3. `key` en listas

```tsx
// HomePage.tsx
{pokemons.map((pokemon) => (
    <li key={pokemon.name}>...</li>
))}
```

React usa el `key` para identificar qué elementos cambiaron al re-renderizar una lista. Sin él, tiene que re-renderizar toda la lista aunque solo cambie un elemento.

Se usa `pokemon.name` en lugar del índice del arreglo porque si la lista cambia de orden (al filtrar o buscar), React detectaría mal los cambios con índices numéricos. El `name` está atado al dato real, no a su posición.

---

### 4. `unknown` en `catch` y type narrowing

```ts
// HomePage.tsx
} catch (error) {
    if (error instanceof Error) {
        setError(error.message);  // TypeScript sabe que tiene .message
    } else {
        setError("No sé que pasó la neta");
    }
}
```

TypeScript tipifica `error` como `unknown` en el `catch` porque cualquier cosa puede ser lanzada con `throw` — un string, un número, un objeto. No solo instancias de `Error`.

El `instanceof Error` hace **type narrowing**: TypeScript reduce el tipo de `unknown` a `Error`, y ahí sí sabe que existe `.message`.

---

### 5. Separación de lógica en servicios

```ts
// ❌ Sin separar — fetch directo en el componente
useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
        .then(res => res.json())
        .then(data => setPokemons(data.results));
}, []);

// ✅ Con separación — servicio independiente
useEffect(() => {
    async function fetchPokemons() {
        const data = await getPokemonList(20);
        setPokemons(data.results);
    }
    fetchPokemons();
}, []);
```

Ventajas de separar en `pokemonService.ts`:
- Si otro componente necesita la misma función, la importa sin duplicar código.
- Si la URL o los headers cambian, se modifica en un solo lugar.
- El componente queda limpio, solo con lógica de UI.
