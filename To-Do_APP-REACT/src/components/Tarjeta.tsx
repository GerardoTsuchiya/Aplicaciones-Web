import type { Tarea } from '../store';

interface TarjetaProps {
    tarea: Tarea;
    indice: number;
    seleccionado: boolean;
    onToggleSeleccion: (indice: number) => void;
    onDelete: (indice: number) => void;
    onEdit: (indice: number, titulo: string, descripcion: string) => void;
    onComplete: (indice: number) => void;
}

function Tarjeta({ tarea, indice, seleccionado, onToggleSeleccion, onDelete, onEdit, onComplete }: TarjetaProps) {
    const handleEdit = () => {
        const nuevoTitulo = prompt("Editar título:", tarea.titulo);
        if (nuevoTitulo !== null && nuevoTitulo.trim() !== "") {
            const nuevaDescripcion = prompt("Editar descripción:", tarea.descripcion);
            onEdit(indice, nuevoTitulo, nuevaDescripcion ?? tarea.descripcion);
        }
    }

    return (
        <tr className={`fila ${tarea.completado ? "fila-completada" : ""} ${seleccionado ? "fila-seleccionada" : ""}`}>
            <td className="col-check">
                <input
                    type="checkbox"
                    checked={seleccionado}
                    onChange={() => onToggleSeleccion(indice)}
                />
            </td>
            <td className="col-titulo">{tarea.titulo}</td>
            <td className="col-descripcion">{tarea.descripcion}</td>
            <td className="col-estado">
                <span className={`badge ${tarea.completado ? "badge-completado" : "badge-pendiente"}`}>
                    {tarea.completado ? "Completado" : "Pendiente"}
                </span>
            </td>
            <td className="col-fecha">{tarea.fechaCreacion}</td>
            <td className="col-acciones">
                <select
                    defaultValue=""
                    className="select-acciones"
                    onChange={(e) => {
                        const accion = e.target.value;
                        e.target.value = "";
                        if (accion === "editar") handleEdit();
                        else if (accion === "eliminar") onDelete(indice);
                        else if (accion === "completar") onComplete(indice);
                    }}
                >
                    <option value="" disabled>Acciones</option>
                    <option value="editar">Editar</option>
                    <option value="eliminar">Eliminar</option>
                    <option value="completar">{tarea.completado ? "Desmarcar" : "Completar"}</option>
                </select>
            </td>
        </tr>
    )
}

export default Tarjeta;
