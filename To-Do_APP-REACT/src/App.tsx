import { useState, useEffect } from 'react';
import './App.css';
import Textbox from './components/Textbox';
import Tarjeta from './components/Tarjeta';
import { useTareasStore, useThemeStore } from './store';

export default function App() {
  const { tareas, addTarea, deleteTarea, editTarea, completeTarea, completarVarios, eliminarVarios } = useTareasStore();
  const { theme, toggleTheme } = useThemeStore();
  const [seleccionados, setSeleccionados] = useState<Set<number>>(new Set());

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleDelete = (indice: number) => {
    deleteTarea(indice);
    setSeleccionados(new Set());
  }

  const toggleSeleccion = (indice: number) => {
    const nuevo = new Set(seleccionados);
    if (nuevo.has(indice)) {
      nuevo.delete(indice);
    } else {
      nuevo.add(indice);
    }
    setSeleccionados(nuevo);
  }

  const toggleTodos = () => {
    if (seleccionados.size === tareas.length) {
      setSeleccionados(new Set());
    } else {
      setSeleccionados(new Set(tareas.map((_, i) => i)));
    }
  }

  const handleCompletarSeleccionados = () => {
    completarVarios(seleccionados);
    setSeleccionados(new Set());
  }

  const handleEliminarSeleccionados = () => {
    eliminarVarios(seleccionados);
    setSeleccionados(new Set());
  }

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>To-Do List</h1>
        <button className="btn btn-tema" onClick={toggleTheme}>
          {theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
        </button>
      </div>
      <Textbox onAdd={addTarea} />

      {seleccionados.size > 0 && (
        <div className="acciones-masivas">
          <span className="seleccion-count">{seleccionados.size} seleccionado(s)</span>
          <button className="btn btn-completar" onClick={handleCompletarSeleccionados}>Completar</button>
          <button className="btn btn-eliminar" onClick={handleEliminarSeleccionados}>Eliminar</button>
        </div>
      )}

      <div className="tabla-wrapper">
        <table className="tabla-tareas">
          <thead>
            <tr>
              <th className="col-check">
                <input
                  type="checkbox"
                  checked={tareas.length > 0 && seleccionados.size === tareas.length}
                  onChange={toggleTodos}
                />
              </th>
              <th>Título</th>
              <th>Descripción</th>
              <th className="col-estado">Completado</th>
              <th>Fecha de creación</th>
              <th className="col-acciones">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tareas.length === 0 ? (
              <tr>
                <td colSpan={6} className="tabla-vacia">
                  No hay tareas. Agrega una nueva tarea para comenzar.
                </td>
              </tr>
            ) : (
              tareas.map((tarea, indice) => (
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
        </table>
      </div>
    </div>
  )
}
