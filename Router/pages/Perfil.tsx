import Navegacion from "../components/Navegacion"

export default function Perfil() {
    return (
        <div>
            <Navegacion />
            <h1>Perfil</h1>
            <p>Este es el perfil del usuario.</p>
            {/* <Outlet /> Aquí se renderizarán los componentes hijos, como Detalles */}
        </div>
    );
}