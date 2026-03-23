import { useState } from "react";

interface TextboxProps {
    onAdd: (titulo: string, descripcion: string) => void;
}

function Textbox({ onAdd }: TextboxProps) {
    const [titulo, setTitulo] = useState<string>("");
    const [descripcion, setDescripcion] = useState<string>("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (titulo.trim() !== "") {
            onAdd(titulo, descripcion);
            setTitulo("");
            setDescripcion("");
        }
    };

    return (
        <form className="form-agregar" onSubmit={handleSubmit}>
            <div className="form-campo">
                <label htmlFor="titulo">Título</label>
                <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} id="titulo" placeholder="Nombre de la tarea" />
            </div>
            <div className="form-campo">
                <label htmlFor="descripcion">Descripción</label>
                <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} id="descripcion" placeholder="Detalles (opcional)" />
            </div>
            <button className="btn btn-agregar" type="submit">+ Agregar</button>
        </form>
    )
}

export default Textbox;
