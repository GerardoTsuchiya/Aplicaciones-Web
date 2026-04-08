import { useUsuarios } from "./hooks/usuarios.hook"
import 'tailwindcss'

function App() {
  const { data, isPending, isError, error, refetch } = useUsuarios();

  if (isPending) return <p>Cargando...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <>
      <h1 className="text-3xl font-bold underline">Listar Usuarios</h1>
      <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => refetch()}>Actualizar</button>

      <ul>
        {data.data.map((usuario) => (
          <li key={usuario.id}>{usuario.nombre} {usuario.apellido}</li>
        ))}
      </ul>
    </>
  )
}

export default App
