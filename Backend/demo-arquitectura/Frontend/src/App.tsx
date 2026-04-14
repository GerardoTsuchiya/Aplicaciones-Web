import 'tailwindcss'
import { useState } from "react";
import { Button } from "./components/ui/button";
import { useAgregarUsuario, useUsuarios, useEliminarUsuario, useEditarUsuario } from "./hooks/usuarios.hook"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const DialogoEditarUsuario = ({ usuarioId, open, onOpenChange }: { usuarioId: number; open: boolean; onOpenChange: (open: boolean) => void }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const { mutate } = useEditarUsuario();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Usuario</DialogTitle>
          <DialogDescription>Complete los campos para editar el usuario</DialogDescription>
        </DialogHeader>
        <FieldGroup className="grid gap-4">
          <Field className="grid gap-2">
            <Label htmlFor="editar-nombre">Nombre</Label>
            <Input id="editar-nombre" placeholder='Nombre' value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </Field>
          <Field className="grid gap-2">
            <Label htmlFor="editar-apellido">Apellido</Label>
            <Input id="editar-apellido" placeholder='Apellido' value={apellido} onChange={(e) => setApellido(e.target.value)} />
          </Field>
        </FieldGroup>
        <DialogFooter>
          <Button variant="destructive" onClick={() => { onOpenChange(false); }}>
            Cancelar
          </Button>
          <Button type="submit" variant="default" onClick={() => {
            mutate({ id: usuarioId, nombre, apellido })
            onOpenChange(false);
            }}>
            Guardar Cambios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

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
        <FieldGroup className="grid gap-4">
          <Field className="grid gap-2">
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              id="nombre"
              placeholder="Nombre"
              value={nombre}
              onChange={(e:any) => setNombre(e.target.value)}
            />
          </Field>
          <Field className="grid gap-2">
            <Label htmlFor="apellido">Apellido</Label>
            <Input
              id="apellido"
              placeholder="Apellido"
              value={apellido}
              onChange={(e:any) => setApellido(e.target.value)}
            />
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Button variant="default" onClick={() => mutate({ nombre, apellido })}>
          Agregar
        </Button>
      </CardFooter>
    </Card>
  );
};

const BotonAcciones = ({ usuarioId }: { usuarioId: number }) => {
  const { mutate } = useEliminarUsuario();
  const [mostrarDialogo, setMostrarDialogo] = useState(false);

  return(
    <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">...</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => {setMostrarDialogo(!mostrarDialogo);}}>Editar Usuario</DropdownMenuItem>
        <DropdownMenuItem variant="destructive" onClick={() => { mutate(usuarioId) }}>Eliminar Usuario</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <DialogoEditarUsuario usuarioId={usuarioId} open={mostrarDialogo} onOpenChange={setMostrarDialogo} />
    </>
  )
}



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
            <TableHead className="font-bold">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((usuario) => (
            <TableRow key={usuario.id}>
              <TableCell>{usuario.id}</TableCell>
              <TableCell>{usuario.nombre}</TableCell>
              <TableCell>{usuario.apellido}</TableCell>
              <TableCell>
                <BotonAcciones usuarioId={usuario.id} />
              </TableCell>
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
