 # React + Vite                                                                                                                  
# To-Do APP - React                                                                                                             
                           
Una aplicacion de lista de tareas (To-Do List) construida con **React 19**, **TypeScript**, **Zustand** y **Vite**.             
                                                                                
## Tabla de contenidos                                                                                                          
                                                                                                             
[Tecnologias](#tecnologias)                                                                                                   
[Instalacion](#instalacion)                                                                                                   
[Estructura del proyecto](#estructura-del-proyecto)                                                                           
[Arquitectura y flujo de datos](#arquitectura-y-flujo-de-datos)                                                               
[Componentes](#componentes)                                                                                                   
[main.jsx](#mainjsx---punto-de-entrada)                                                                                     
[store.ts](#storets---estado-global-con-zustand)                                                                            
[App.tsx](#apptsx---componente-principal)                                                                                   
[Textbox.tsx](#textboxtsx---formulario-de-entrada)                                                                          
[Tarjeta.tsx](#tarjetatsx---fila-de-la-tabla)                                                                               
[Estilos y temas](#estilos-y-temas)                                                                                           
[Persistencia de datos](#persistencia-de-datos)                                                                               
                                                         
## Tecnologias                                                                                                                  
                                                                                         
| Tecnologia | Version | Proposito |                                                                                            
|---|---|---|                                                                                                                   
| **React** | 19 | Libreria de UI basada en componentes |                                                                       
| **TypeScript** | - | Tipado estatico para mayor seguridad en el codigo |                                                      
| **Vite** | 8 | Bundler y servidor de desarrollo rapido |                                                                      
| **Zustand** | 5 | Manejo de estado global con persistencia |                                                                  
                            
## Instalacion                                                                                                                  
                                                                                                                                
```bash                                                                                                                         
git clone https://github.com/GerardoTsuchiya/Aplicaciones-Web.git                                                               
cd Aplicaciones-Web/To-Do_APP-REACT                                                                                             
npm install                                                                                                                     
npm run dev                                                                                                                     
```                                                                                                                             
                                                                                                                                
## Estructura del proyecto                                                                                                      
                                                                                                                              
```                                                                                                                             
To-Do_APP-REACT/                                                                                                                
|-- index.html              # HTML base donde se monta React                                                                    
|-- package.json            # Dependencias y scripts                                                                            
|-- vite.config.js          # Configuracion de Vite                                                                             
-- src/                                                                                                                        
|-- main.jsx            # Punto de entrada de la aplicacion                                                                 
|-- store.ts            # Estado global (Zustand) - tareas y tema                                                           
|-- App.tsx             # Componente raiz - tabla, seleccion, tema                                                          
|-- App.css             # Estilos del layout, tabla, botones, badges                                                        
|-- index.css           # Variables CSS globales y paleta de colores                                                        
-- components/                                                                                                             
|-- Textbox.tsx     # Formulario para agregar tareas                                                                    
-- Tarjeta.tsx     # Fila individual de la tabla                                                                       
```                                                                                                                             
                                                                                                                              
## Arquitectura y flujo de datos                                                                                                
                                                                                                                               
La aplicacion sigue una arquitectura de **estado centralizado** usando Zustand:                                                 
                                                                                                                             
```                                                                                                                             
+-----------------------------------------------------+                                                                         
|                    store.ts                          |                                                                        
|  +-----------------+    +------------------------+  |                                                                         
|  |  useThemeStore   |    |    useTareasStore       |  |                                                                       
|  |  - theme         |    |    - tareas[]           |  |                                                                       
|  |  - toggleTheme() |    |    - addTarea()         |  |                                                                       
|  +--------+---------+    |    - deleteTarea()      |  |                                                                       
|           |              |    - editTarea()         |  |                                                                      
|           |              |    - completeTarea()     |  |                                                                      
|           |              |    - completarVarios()   |  |                                                                      
|           |              |    - eliminarVarios()    |  |                                                                      
|           |              +-----------+--------------+  |                                                                      
|           |         localStorage     |  localStorage   |                                                                      
|           |        (theme-storage)   | (tareas-storage) |                                                                     
+-----------+--------------------------+-----------------+                                                                      
            |                          |                                                                                        
            v                          v                                                                                        
+-----------------------------------------------------+                                                                         
|                     App.tsx                          |                                                                        
|  - Lee theme y tareas del store                     |                                                                         
|  - Aplica data-theme al html via useEffect          |                                                                         
|  - Maneja seleccion local (useState Set number)     |                                                                         
|  - Pasa callbacks a Textbox y Tarjeta               |                                                                         
|    +----------+     +--------------------------+    |                                                                         
|    | Textbox  |     |  table con Tarjeta       |    |                                                                         
|    | onAdd ---+-->  |  por cada tarea           |    |                                                                        
|    +----------+     +--------------------------+    |                                                                         
+-----------------------------------------------------+                                                                         
```                                                                                                                             
                                                                                                                               
### Flujo paso a paso                                                                                                           
                                                                                                                                
1. **El usuario agrega una tarea** en Textbox -> llama `addTarea(titulo, descripcion)` del store -> Zustand actualiza el        
array tareas -> App se re-renderiza -> aparece nueva fila en la tabla.                                                          
                                                                                                                                
2. **El usuario selecciona tareas** con checkboxes -> App actualiza su estado local seleccionados (un Set de number) -> a       
parece la barra de acciones masivas.                                                                                            
                                                                                                                                
3. **El usuario ejecuta una accion** (editar/eliminar/completar) desde el dropdown en Tarjeta -> llama la funcion corresp       
ondiente del store -> Zustand persiste automaticamente en localStorage.                                                         
                                                                                                                               
4. **El usuario cambia el tema** -> toggleTheme() del store -> useEffect en App pone data-theme en el html -> las variabl       
es CSS cambian -> toda la UI se actualiza.                                                                                      
                                                                                                                               
---                                                                                                                             
                                                                                                                                
## Componentes                                                                                                                  
                                                                                                                               
### main.jsx - Punto de entrada                                                                                                 
                                                                                                                               
```jsx                                                                                                                          
createRoot(document.getElementById('root')).render(                                                                             
  <StrictMode>                                                                                                                  
    <App />                                                                                                                     
  </StrictMode>,                                                                                                                
)                                                                                                                               
```                                                                                                                             
                                                                                                                                
- Monta la aplicacion React en el elemento #root del index.html.                                                                
- StrictMode activa verificaciones adicionales durante el desarrollo (detecta efectos secundarios inesperados, uso deprec       
ado de APIs, etc.).                                                                                                             
- Importa index.css que define las variables CSS globales.                                                                      
                                                                                                                               
---                                                                                                                             
                                                                                                                               
### store.ts - Estado global con Zustand                                                                                        
                                                                                                                                
Este archivo es el **cerebro** de la aplicacion. Define dos stores independientes:                                              
                                                                                                                                
#### useTareasStore - Estado de las tareas                                                                                      
                                                                                                                               
```typescript                                                                                                                   
export interface Tarea {                                                                                                        
  titulo: string;                                                                                                               
  descripcion: string;                                                                                                          
  completado: boolean;                                                                                                          
  fechaCreacion: string;                                                                                                        
}                                                                                                                               
```                                                                                                                             
                                                                                                                                
Cada tarea es un objeto con estas 4 propiedades. El store expone las siguientes acciones:                                       
                                                                                                                                
| Accion | Que hace |                                                                                                           
|---|---|                                                                                                                       
| `addTarea(titulo, descripcion)` | Crea una nueva tarea con completado false y la fecha actual |                               
| `deleteTarea(indice)` | Elimina la tarea en la posicion indicada |                                                            
| `editTarea(indice, titulo, descripcion)` | Modifica titulo y descripcion de una tarea |                                       
| `completeTarea(indice)` | Alterna el estado completado (true/false) de una tarea |                                            
| `completarVarios(indices)` | Marca como completadas todas las tareas cuyos indices esten en el Set |                          
| `eliminarVarios(indices)` | Elimina todas las tareas cuyos indices esten en el Set |                                          
                                                                                                                                
**Como funciona persist:**                                                                                                      
                                                                                                                                
```typescript                                                                                                                   
export const useTareasStore = create<TareasState>()(                                                                            
  persist(                                                                                                                      
    (set) => ({                                                                                                                 
      // ... estado y acciones                                                                                                  
    }),                                                                                                                         
    { name: 'tareas-storage' }  // clave en localStorage                                                                        
  )                                                                                                                             
);                                                                                                                              
```                                                                                                                             
                                                                                                                                
El middleware persist de Zustand envuelve al store y automaticamente:                                                           
- **Guarda** el estado en localStorage cada vez que cambia.                                                                     
- **Restaura** el estado desde localStorage cuando la app se carga.                                                             
- Usa la clave tareas-storage para identificar los datos.                                                                       
                                                                                                                                
#### useThemeStore - Estado del tema                                                                                            
                                                                                                                                
```typescript                                                                                                                   
type Theme = 'light' | 'dark';                                                                                                  
```                                                                                                                             
                                                                                                                                
| Accion | Que hace |                                                                                                           
|---|---|                                                                                                                       
| `toggleTheme()` | Alterna entre light y dark |                                                                                
                                                                                                                               
Persistido bajo la clave theme-storage en localStorage.                                                                         
                                                                                                                               
**Concepto clave - create() de Zustand:**                                                                                       
                                                                                                                               
A diferencia de useState de React (que es local a un componente), create() de Zustand crea un estado **global**. Cualquie       
r componente que llame useTareasStore() obtiene los mismos datos y, cuando el estado cambia, todos los componentes que lo       
usan se re-renderizan automaticamente.                                                                                         
                                                                                                                               
---                                                                                                                             
                                                                                                                                
### App.tsx - Componente principal                                                                                              
                                                                                                                                
Este es el componente raiz que organiza toda la UI. Tiene tres responsabilidades:                                               
                                                                                                                                
#### 1. Conexion con los stores                                                                                                 
                                                                                                                                
```typescript                                                                                                                   
const { tareas, addTarea, deleteTarea, ... } = useTareasStore();                                                                
const { theme, toggleTheme } = useThemeStore();                                                                                 
```                                                                                                                             
                                                                                                                                
Desestructura el estado y las acciones directamente de los stores de Zustand.                                                   
                                                                                                                                
#### 2. Gestion del tema con useEffect                                                                                          
                                                                                                                                
```typescript                                                                                                                   
useEffect(() => {                                                                                                               
  document.documentElement.setAttribute('data-theme', theme);                                                                   
}, [theme]);                                                                                                                    
```                                                                                                                             
                                                                                                                                
- useEffect se ejecuta cada vez que theme cambia.                                                                               
- Coloca el atributo data-theme en el elemento html.                                                                            
- Esto activa el selector CSS `:root[data-theme="dark"]` que redefine todas las variables de color.                             
                                                                                                                                
#### 3. Seleccion multiple (estado local)                                                                                       
                                                                                                                                
```typescript                                                                                                                   
const [seleccionados, setSeleccionados] = useState<Set<number>>(new Set());                                                     
```                                                                                                                             
                                                                                                                                
La seleccion es estado **local** (no persiste en localStorage) porque es temporal -- solo importa mientras el usuario int       
eractua. Usa un Set de number para almacenar los indices seleccionados:                                                         
- `seleccionados.has(i)` -- verificar si una fila esta seleccionada (O(1))                                                      
- `nuevo.add(i)` / `nuevo.delete(i)` -- agregar/quitar seleccion                                                                
- `seleccionados.size` -- contar seleccionados                                                                                  
                                                                                                                                
#### Estructura del JSX                                                                                                         
                                                                                                                                
```                                                                                                                             
app-container                                                                                                                   
|-- app-header (h1 + boton de tema)                                                                                             
|-- Textbox (formulario)                                                                                                        
|-- acciones-masivas (aparece solo si hay seleccionados)                                                                        
++-- tabla-wrapper                                                                                                               
    +-- table.tabla-tareas                                                                                                      
       |-- thead (checkbox seleccionar todos + encabezados)                                                                    
        +-- tbody (Tarjeta x N)                                                                                                 
```                                                                                                                             
                                                                                                                                
---                                                                                                                             
                                                                                                                                
### Textbox.tsx - Formulario de entrada                                                                                         
                                                                                                                               
Un componente **controlado** con dos campos de texto.                                                                           
                                                                                                                               
```typescript                                                                                                                   
interface TextboxProps {                                                                                                        
    onAdd: (titulo: string, descripcion: string) => void;                                                                       
}                                                                                                                               
```                                                                                                                             
                                                                                                                               
**Props que recibe:**                                                                                                           
- onAdd -- funcion callback que se llama cuando el usuario envia el formulario.                                                 
                                                                                                                                
**Estado local:**                                                                                                               
- titulo y descripcion -- controlados con useState, se sincronizan con los inputs via value y onChange.                         
                                                                                                                                
**Flujo del submit:**                                                                                                           
1. El usuario llena los campos y presiona "Agregar" (o Enter).                                                                  
2. handleSubmit se ejecuta, previene el comportamiento por defecto del formulario (event.preventDefault()).                     
3. Valida que el titulo no este vacio.                                                                                          
4. Llama onAdd(titulo, descripcion) que viene de App y es en realidad addTarea del store.                                       
5. Limpia ambos campos.                                                                                                         
                                                                                                                                
**Concepto clave - Componentes controlados:**                                                                                   
                                                                                                                                
```jsx                                                                                                                          
<input value={titulo} onChange={(e) => setTitulo(e.target.value)} />                                                            
```                                                                                                                             
                                                                                                                                
React controla el valor del input. Cada tecla que presionas dispara onChange -> actualiza el estado -> React re-renderiza       
 el input con el nuevo valor. Esto permite validar, transformar o limpiar el input programaticamente.                           
                                                                                                                                
---                                                                                                                             
                                                                                                                                
### Tarjeta.tsx - Fila de la tabla                                                                                              
                                                                                                                                
Renderiza una fila `<tr>` dentro de la tabla para una tarea especifica.                                                         
                                                                                                                                
```typescript                                                                                                                   
interface TarjetaProps {                                                                                                        
    tarea: Tarea;                    // datos de la tarea                                                                       
    indice: number;                  // posicion en el array                                                                    
    seleccionado: boolean;           // si esta seleccionada                                                                    
    onToggleSeleccion: (indice: number) => void;                                                                                
    onDelete: (indice: number) => void;                                                                                         
    onEdit: (indice: number, titulo: string, descripcion: string) => void;                                                      
    onComplete: (indice: number) => void;                                                                                       
}                                                                                                                             
```                                                                                                                             
                                                                                                                                
**Lo que renderiza cada columna:**                                                                                              
                                                                                                                                
| Columna | Contenido |                                                                                                         
|---|---|                                                                                                                       
| Checkbox | input type checkbox ligado a seleccionado |                                                                        
| Titulo | Texto del titulo |                                                                                                   
| Descripcion | Texto de la descripcion |                                                                                       
| Completado | Badge con "Completado" (verde) o "Pendiente" (rojo) |                                                            
| Fecha | Fecha de creacion formateada |                                                                                        
| Acciones | select dropdown con Editar, Eliminar, Completar/Desmarcar |                                                        
                                                                                                                               
**El dropdown de acciones:**                                                                                                    
                                                                                                                                
```jsx                                                                                                                          
<select defaultValue="" onChange={(e) => {                                                                                      
    const accion = e.target.value;                                                                                              
    e.target.value = "";  // resetea el dropdown                                                                                
    if (accion === "editar") handleEdit();                                                                                      
    // ...                                                                                                                      
}}>                                                                                                                             
```                                                                                                                             
                                                                                                                                
Usa un select como menu de acciones. Despues de seleccionar una opcion, resetea el valor a vacio para que el dropdown sie       
mpre muestre "Acciones".                                                                                                        
                                                                                                                                
**Clases CSS dinamicas:**                                                                                                       
                                                                                                                                
```jsx                                                                                                                          
<tr className={`fila ${tarea.completado ? "fila-completada" : ""} ${seleccionado ? "fila-seleccionada" : ""}`}>                 
```                                                                                                                             
                                                                                                                                
Usa template literals para aplicar clases condicionalmente:                                                                     
- fila -- siempre presente (para hover effects)                                                                                 
- fila-completada -- agrega tachado y opacidad                                                                                  
- fila-seleccionada -- agrega color de fondo destacado                                                                          
                                                                                                                               
---                                                                                                                             
                                                                                                                               
## Estilos y temas                                                                                                              
                                                                                                                                
### Paleta de colores                                                                                                           
                                                                                                                                
La aplicacion usa una paleta de 5 colores definida como variables CSS en index.css:                                             
                                                                                                                                
| Variable | Color | Hex | Uso |                                                                                                
|---|---|---|---|                                                                                                               
| --slate | Dark Slate Grey | #335C67 | Encabezado de tabla, boton completar, badge completado |                                
| --custard | Vanilla Custard | #FFF3B0 | Fondo claro, texto del header de tabla |                                              
| --bronze | Honey Bronze | #E09F3E | Acento principal -- boton agregar, focus, checkboxes |                                    
| --brown-red | Brown Red | #9E2A2B | Acciones destructivas -- eliminar, badge pendiente |                                      
| --cherry | Black Cherry | #540B0E | Bordes profundos, sombras en modo oscuro |                                                
                                                                                                                                
### Sistema de temas                                                                                                            
                                                                                                                                
El tema se controla mediante el atributo data-theme en el elemento html:                                                        
                                                                                                                               
```css                                                                                                                          
/* Modo claro (por defecto) */                                                                                                  
:root {                                                                                                                         
  --bg: #FFF8E1;                                                                                                                
  --text: #5a6a6e;                                                                                                              
  }                                                                                                                               
                                                                                                                                
/* Modo oscuro */                                                                                                               
:root[data-theme="dark"] {                                                                                                      
  --bg: #1a0e0f;                                                                                                                
  --text: #b8a98a;                                                                                                              
}                                                                                                                               
```                                                                                                                             
                                                                                                                               
Al cambiar el valor de data-theme, todas las variables CSS se redefinen y la UI completa se actualiza sin necesidad de re       
-renderizar los componentes de React -- el navegador recalcula los estilos automaticamente.                                     
                                                                                                                                
---                                                                                                                             
                                                                                                                                
## Persistencia de datos                                                                                                        
                                                                                                                                
Zustand con el middleware persist guarda automaticamente el estado en el localStorage del navegador:                            
                                                                                                                               
| Clave en localStorage | Datos |                                                                                               
|---|---|                                                                                                                       
| tareas-storage | Array de tareas con titulo, descripcion, estado y fecha |                                                    
| theme-storage | Preferencia de tema (light o dark) |                                                                          
                                                                                                                               
Esto significa que:                                                                                                             
- Las tareas **sobreviven** al cerrar y reabrir el navegador.                                                                   
- La preferencia de tema **se mantiene** entre sesiones.                                                                        
- No se requiere un backend o base de datos.                                                                                    
                                                                                                                                
Para borrar todos los datos, puedes abrir las DevTools del navegador (F12) -> Application -> Local Storage -> eliminar la       
s claves correspondientes.                         