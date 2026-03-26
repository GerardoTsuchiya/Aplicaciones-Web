# Filtro y búsqueda de tareas — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Agregar búsqueda por texto y filtro por estado a la tabla de tareas, integrados como una segunda fila en el `<thead>`.

**Architecture:** El estado de filtro vive como `useState` local en `App.tsx`. Se calcula una lista derivada `tareasFiltradas` (array de `{ tarea, indice }`) para que cada `<Tarjeta>` reciba siempre el índice real del store. No se modifica `store.ts` ni `Tarjeta.tsx`.

**Tech Stack:** React 19, TypeScript, Zustand, Vite. Sin framework de testing — verificación manual en el navegador con `npm run dev`.

---

## Archivos afectados

| Archivo | Cambio |
|---|---|
| `src/App.tsx` | Nuevo estado, lista derivada, tbody actualizado, toggleTodos fijo, fila de filtros en thead |
| `src/App.css` | Estilos para la fila de filtros; color de `th` cambiado a blanco |

---

## Task 1: Estado de filtro, lista derivada y tbody

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Agregar los dos nuevos `useState` en `App()`**

Añade estas dos líneas justo después de la línea `const [seleccionados, setSeleccionados] = useState<Set<number>>(new Set());` (línea 10):

```tsx
const [busqueda, setBusqueda] = useState('');
const [filtroEstado, setFiltroEstado] = useState<'todos' | 'completadas' | 'pendientes'>('todos');
```

- [ ] **Step 2: Agregar `tareasFiltradas` antes del `return`**

Añade este bloque justo después del handler `handleEliminarSeleccionados` (antes del `return`):

```tsx
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

- [ ] **Step 3: Actualizar el `tbody` para iterar `tareasFiltradas`**

Reemplaza el bloque completo del `tbody` (líneas 85–106 en App.tsx original):

```tsx
<tbody>
  {tareasFiltradas.length === 0 ? (
    <tr>
      <td colSpan={6} className="tabla-vacia">
        {tareas.length === 0
          ? 'No hay tareas. Agrega una nueva tarea para comenzar.'
          : 'Ninguna tarea coincide con el filtro actual.'}
      </td>
    </tr>
  ) : (
    tareasFiltradas.map(({ tarea, indice }) => (
      <Tarjeta
        key={indice}
        tarea={tarea}
        indice={indice}
        seleccionado={seleccionados.has(indice)}
        onToggleSeleccion={toggleSeleccion}
        onDelete={handleDelete}
        onEdit={editTarea}
        onComplete={completeTarea}
      />
    ))
  )}
</tbody>
```

- [ ] **Step 4: Verificar en el navegador**

Corre `npm run dev` y comprueba:
- Las tareas existentes siguen apareciendo (la lista sin filtro muestra todo).
- Editar, eliminar y completar una tarea sigue funcionando.
- El mensaje "No hay tareas" aparece cuando el store está vacío.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx
git commit -m "feat: add filter state and tareasFiltradas derived list"
```

---

## Task 2: Corregir `toggleTodos` y el checkbox "seleccionar todos"

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Reemplazar `toggleTodos`**

Reemplaza la función `toggleTodos` completa (líneas 31–37 originales) con:

```tsx
const toggleTodos = () => {
  const indicesFiltrados = tareasFiltradas.map(({ indice }) => indice);
  if (indicesFiltrados.length > 0 && indicesFiltrados.every(i => seleccionados.has(i))) {
    setSeleccionados(new Set());
  } else {
    setSeleccionados(new Set(indicesFiltrados));
  }
}
```

- [ ] **Step 2: Corregir el prop `checked` del checkbox "seleccionar todos"**

Encuentra el `<input type="checkbox"` dentro del `<th className="col-check">` del thead y reemplaza su atributo `checked`:

```tsx
// Antes:
checked={tareas.length > 0 && seleccionados.size === tareas.length}

// Después:
checked={tareasFiltradas.length > 0 && tareasFiltradas.every(({ indice }) => seleccionados.has(indice))}
```

- [ ] **Step 3: Verificar en el navegador**

Con `npm run dev`, crea al menos 3 tareas (algunas completadas, otras pendientes) y comprueba:
- El checkbox de cabecera selecciona solo las filas visibles cuando hay un filtro activo.
- Deseleccionar todos funciona correctamente.
- Las acciones masivas (Completar / Eliminar) siguen operando sobre las tareas correctas.

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx
git commit -m "fix: toggleTodos operates on filtered indices only"
```

---

## Task 3: Fila de filtros en el `<thead>` y estilos CSS

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/App.css`

- [ ] **Step 1: Agregar la segunda fila al `<thead>`**

Justo después del `</tr>` que cierra la fila de encabezados de columnas (después del `<th className="col-acciones">Acciones</th>`), añade:

```tsx
<tr className="filtro-fila">
  <td colSpan={6} className="filtro-celda">
    <div className="filtro-controles">
      <input
        className="filtro-input"
        type="text"
        placeholder="Buscar por título o descripción..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <div className="filtro-botones">
        {(['todos', 'completadas', 'pendientes'] as const).map((opcion) => (
          <button
            key={opcion}
            className={`filtro-btn${filtroEstado === opcion ? ' filtro-btn-activo' : ''}`}
            onClick={() => setFiltroEstado(opcion)}
          >
            {opcion === 'todos' ? 'Todos' : opcion === 'completadas' ? '✅ Completadas' : '⏳ Pendientes'}
          </button>
        ))}
      </div>
    </div>
  </td>
</tr>
```

- [ ] **Step 2: Cambiar color de los `<th>` a blanco en `App.css`**

Encuentra la regla `.tabla-tareas th` y cambia `color: var(--custard)` a `color: #ffffff`:

```css
.tabla-tareas th {
  padding: 12px 16px;
  font-size: 13px;
  font-weight: 600;
  color: #ffffff;
  text-align: left;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid var(--cherry);
}
```

- [ ] **Step 3: Agregar estilos para la fila de filtros al final de `App.css`**

Añade al final del archivo `src/App.css`:

```css
/* ── Filter row ── */
.filtro-fila td {
  padding: 8px 16px;
  background: var(--slate);
  border-bottom: 2px solid var(--cherry);
}

.filtro-controles {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filtro-input {
  flex: 1;
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;
  font-size: 13px;
  transition: border-color 0.2s;
}

.filtro-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.filtro-input:focus {
  outline: none;
  border-color: var(--accent);
}

.filtro-botones {
  display: flex;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.3);
  flex-shrink: 0;
}

.filtro-btn {
  padding: 6px 12px;
  border: none;
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}

.filtro-btn:first-child {
  border-left: none;
}

.filtro-btn:hover {
  background: rgba(255, 255, 255, 0.22);
}

.filtro-btn-activo {
  background: var(--accent);
  color: var(--slate);
}

.filtro-btn-activo:hover {
  background: var(--accent);
  opacity: 0.9;
}
```

- [ ] **Step 4: Verificar en el navegador**

Con `npm run dev`, comprueba:
- La fila de filtros aparece debajo de los encabezados de columna.
- Los encabezados de columna (Título, Descripción, etc.) se leen en blanco.
- Escribir en el input filtra las filas en tiempo real.
- Los botones de segmento cambian el filtro de estado; el activo se resalta en dorado.
- Combinar texto + estado filtra correctamente (AND).
- El mensaje "Ninguna tarea coincide con el filtro actual." aparece cuando no hay resultados.
- El modo oscuro se ve bien (el input y los botones sobre fondo --slate).

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/App.css
git commit -m "feat: add search and status filter row to table header"
```
