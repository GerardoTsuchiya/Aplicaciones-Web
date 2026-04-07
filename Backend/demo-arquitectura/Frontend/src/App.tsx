import { useUsuarios } from "./hooks/usuarios.hook"

function App() {
  const { data, isPending, isError, error, refetch } = useUsuarios();

  if (isPending) return <p>Cargando...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <>
      <h1>Listar Usuarios</h1>
      <button onClick={() => refetch()}>Actualizar</button>

      <ul>
        {data.data.map((usuario) => (
          <li key={usuario.id}>{usuario.nombre} {usuario.apellido}</li>
        ))}
      </ul>
    </>
  )
}

export default App
