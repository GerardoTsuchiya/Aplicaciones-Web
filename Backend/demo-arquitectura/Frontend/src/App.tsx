import { Button } from "./components/ui/button";
import { useUsuarios } from "./hooks/usuarios.hook"
import 'tailwindcss'

function App() {
  const { data, isPending, isError, error, refetch } = useUsuarios();

  if (isPending) return <p>Cargando...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <>
      <h1 className="text-3xl font-bold underline">Listar Usuarios</h1>
      <ul>
        {data.data.map((usuario) => (
          <li key={usuario.id}>{usuario.nombre} {usuario.apellido}</li>
        ))}
      </ul>
      <Button variant="default" onClick={() => refetch()}>Actualizar</Button>
    </>
  )
}

export default App
