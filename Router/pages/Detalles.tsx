import { useParams } from 'react-router';

export default function Detalles() {
    let params = useParams();
    console.log("Parámetros de la ruta:", params); // Para verificar los parámetros recibidos
    return (
        <div>
            <h1>Detalles</h1>
            <p>Aquí puedes ver los detalles de tu selección.</p>
        </div>
    );
}