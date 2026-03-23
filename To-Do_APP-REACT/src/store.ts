import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Tarea {
  titulo: string;
  descripcion: string;
  completado: boolean;
  fechaCreacion: string;
}

interface TareasState {
  tareas: Tarea[];
  addTarea: (titulo: string, descripcion: string) => void;
  deleteTarea: (indice: number) => void;
  editTarea: (indice: number, titulo: string, descripcion: string) => void;
  completeTarea: (indice: number) => void;
  completarVarios: (indices: Set<number>) => void;
  eliminarVarios: (indices: Set<number>) => void;
}

export const useTareasStore = create<TareasState>()(
  persist(
    (set) => ({
      tareas: [],
      addTarea: (titulo, descripcion) =>
        set((state) => ({
          tareas: [
            ...state.tareas,
            { titulo, descripcion, completado: false, fechaCreacion: new Date().toLocaleString() },
          ],
        })),
      deleteTarea: (indice) =>
        set((state) => ({
          tareas: state.tareas.filter((_, i) => i !== indice),
        })),
      editTarea: (indice, titulo, descripcion) =>
        set((state) => ({
          tareas: state.tareas.map((t, i) =>
            i === indice ? { ...t, titulo, descripcion } : t
          ),
        })),
      completeTarea: (indice) =>
        set((state) => ({
          tareas: state.tareas.map((t, i) =>
            i === indice ? { ...t, completado: !t.completado } : t
          ),
        })),
      completarVarios: (indices) =>
        set((state) => ({
          tareas: state.tareas.map((t, i) =>
            indices.has(i) ? { ...t, completado: true } : t
          ),
        })),
      eliminarVarios: (indices) =>
        set((state) => ({
          tareas: state.tareas.filter((_, i) => !indices.has(i)),
        })),
    }),
    { name: 'tareas-storage' }
  )
);

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
    }),
    { name: 'theme-storage' }
  )
);
