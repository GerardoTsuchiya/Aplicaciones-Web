import 'tailwindcss'
import { useState } from "react";
import { Button } from "./components/ui/button";
import { useAgregarUsuario, useUsuarios } from "./hooks/usuarios.hook"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const TarjetaAgregarUsuario = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const { mutate } = useAgregarUsuario();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agregar Usuario</CardTitle>
        <CardDescription>Complete los campos para agregar un nuevo usuario</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              id="nombre"
              placeholder="Nombre"
              value={nombre}
              onChange={(e:any) => setNombre(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="apellido">Apellido</Label>
            <Input
              id="apellido"
              placeholder="Apellido"
              value={apellido}
              onChange={(e:any) => setApellido(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="default" onClick={() => mutate({ id: 0, nombre, apellido })}>
          Agregar
        </Button>
      </CardFooter>
    </Card>
  );
};

function App() {
  const { data, isPending, isError, error, refetch } = useUsuarios();
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);

  if (isPending) return <p>Cargando...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <>
      <h1 className="text-center text-3xl font-bold underline m-5">Lista de Usuarios</h1>
      <Table>
        <TableCaption>Usuarios registrados</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">ID</TableHead>
            <TableHead className="font-bold">Nombre</TableHead>
            <TableHead className="font-bold">Apellido</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((usuario) => (
            <TableRow key={usuario.id}>
              <TableCell>{usuario.id}</TableCell>
              <TableCell>{usuario.nombre}</TableCell>
              <TableCell>{usuario.apellido}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button variant="default" onClick={() => refetch()}>Actualizar</Button>
      <Button variant="outline" onClick={() => setMostrarTarjeta(!mostrarTarjeta)}>
        {mostrarTarjeta ? "Ocultar" : ""} Agregar Usuario
      </Button>
      {mostrarTarjeta && <TarjetaAgregarUsuario />}
    </>
  )
}

export default App
