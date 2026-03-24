import { NavLink } from "react-router";

export default function Navegacion() {
    const id = 123; // Ejemplo de ID para la ruta de detalles

    return (
        <nav>
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Inicio</NavLink> |{" "}
            <NavLink to="/perfil" className={({ isActive }) => (isActive ? "active" : "")}>Perfil</NavLink> |{" "}
            <NavLink to="/config" className={({ isActive }) => (isActive ? "active" : "")}>Configuración</NavLink> | {" "}
            <NavLink to={`/perfil/detalles/${id}`} className={({ isActive }) => (isActive ? "active" : "")}>Detalles del Perfil</NavLink>
        </nav>
    );
}