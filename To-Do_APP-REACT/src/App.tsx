import { useState, useEffect } from 'react';
import './App.css';
import Textbox from './components/Textbox';
import Tarjeta from './components/Tarjeta';
import { useTareasStore, useThemeStore } from './store';

export default function App() {
  const { tareas, addTarea, deleteTarea, editTarea, completeTarea, completarVarios, eliminarVarios } = useTareasStore();
  const { theme, toggleTheme } = useThemeStore();
  const [seleccionados, setSeleccionados] = useState<Set<number>>(new Set());
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState<'todos' | 'completadas' | 'pendientes'>('todos');

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
        </table>
      </div>
    </div>
  )
}
