# Filtro y búsqueda de tareas — Diseño

**Fecha:** 2026-03-25
**Proyecto:** To-Do APP React
**Estado:** Aprobado

---

## Resumen

Agregar a la tabla de tareas un input de búsqueda por texto y botones de filtro por estado (Todos / Completadas / Pendientes), integrados como una segunda fila en el `<thead>` de la tabla. El filtrado es puramente de UI: no se persiste, no modifica el store.

---

## Decisiones de diseño

| Decisión | Elección | Razón |
|---|---|---|
| Ubicación de controles | Segunda fila del `<thead>` | Flujo natural junto a los encabezados de columna |
| Alcance de búsqueda | Título + descripción | El usuario quiere buscar en ambos campos |
| Control de estado | Botones de segmento (Todos / ✅ Completadas / ⏳ Pendientes) | Más visual e inmediato que un dropdown |
| Gestión del estado | `useState` local en `App.tsx` | El filtro es UI temporal, no debe persistir en localStorage |
| Color texto encabezados | Blanco `#ffffff` sobre `#335C67` | Mayor contraste que el custard `#FFF3B0` anterior |

---

## Arquitectura

### Estado nuevo en `App.tsx`

```ts
const [busqueda, setBusqueda] = useState('');
const [filtroEstado, setFiltroEstado] = useState<'todos' | 'completadas' | 'pendientes'>('todos');
```

### Lista derivada `tareasFiltradas`

Calculada antes del `return`, combina el índice real con la tarea para que `<Tarjeta>` siempre opere sobre el índice correcto del store:

```ts
const tareasFiltradas = tareas
  .map((tarea, indice) => ({ tarea, indice }))
  .filter(({ tarea }) => {
    const texto = busqueda.toLowerCase();
    const coincideTexto =
      tarea.titulo.toLowerCase().includes(texto) ||
      tarea.descripcion.toLowerCase().includes(texto);
    const coincideEstado =
      filtroEstado === 'todos' ||
      (filtroEstado === 'completadas' && tarea.completado) ||
      (filtroEstado === 'pendientes' && !tarea.completado);
    return coincideTexto && coincideEstado;
  });
```

---

## Cambios por archivo

### `App.tsx` (único archivo modificado)

1. **Dos nuevos `useState`:** `busqueda` y `filtroEstado`.
2. **`tareasFiltradas`:** lista derivada `{ tarea, indice }[]` calculada en cada render.
3. **`toggleTodos` ajustado:** opera sobre los índices reales de `tareasFiltradas`, no sobre todos los índices de `tareas`.
4. **Checkbox "seleccionar todos":** `checked` cuando todos los índices filtrados están en `seleccionados`.
5. **`tbody`:** itera `tareasFiltradas` en lugar de `tareas`.
6. **Mensaje de tabla vacía:** distingue "No hay tareas" (store vacío) vs "Ninguna tarea coincide" (filtro activo).
7. **Segunda fila del `<thead>`:** contiene el input de búsqueda y los tres botones de segmento.

### `store.ts` — sin cambios

### `Tarjeta.tsx` — sin cambios

---

## UI — Segunda fila del thead

```
[ 🔍 Buscar por título o descripción...  ] [ Todos | ✅ Completadas | ⏳ Pendientes ]
```

- Fondo: `#4a7a87` (un tono más claro que `#335C67` para distinguirla visualmente)
- Input: fondo `rgba(255,255,255,0.15)`, texto blanco, ocupa el ancho restante
- Botones: el activo se resalta con `#E09F3E` (bronze) y texto `#335C67`; los inactivos con fondo semitransparente y texto blanco

---

## Comportamiento esperado

- Buscar "comprar" muestra solo las tareas cuyo título o descripción contenga "comprar" (insensible a mayúsculas).
- Seleccionar "Completadas" oculta las tareas pendientes.
- Los dos filtros se aplican simultáneamente (AND).
- El checkbox "seleccionar todos" solo afecta las filas actualmente visibles.
- Limpiar la búsqueda o volver a "Todos" restaura la lista completa.
- Si ninguna tarea coincide, la tabla muestra: *"Ninguna tarea coincide con el filtro actual."*
