const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

let usuarios = [
    { id: 1, nombre: "Alice", apellido: "Smith" },
    { id: 2, nombre: "Bob", apellido: "Johnson" },
    { id: 3, nombre: "Charlie", apellido: "Brown" }
];

app.use(express.json()); // Middleware para parsear JSON en el cuerpo de las solicitudes
app.use(cors()); // Middleware para habilitar CORS

// req = request, Es la informacion que el cliente envía al servidor, como parámetros de URL, datos de formulario, etc.
// res = response, Es la información que el servidor envía de vuelta al cliente, como el contenido de una página web, datos JSON, etc.

/* ----------------------------------------------- GET -------------------------------------------------------*/
app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.get("/usuarios", (req, res) => {
    res.json({ data: usuarios });
});

app.get("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    
    if(isNaN(id)) {
        res.status(400).json({ message: "ID inválido" });
        return;
    }

    const usuario = usuarios.find(u => u.id === id);
    if (usuario) {
        res.status(200).json({ message: "Usuario encontrado", data: usuario});
    } else {
        res.status(404).json({ message: "Usuario no encontrado" });
    }

});

/* ----------------------------------------------- POST -------------------------------------------------------*/

app.post("/usuarios", (req, res) => {
    const nombre = req.body.nombre; // Suponiendo que el cliente envía un JSON con un campo "nombre"
    const apellido = req.body.apellido; // Suponiendo que el cliente envía un JSON con un campo "apellido"
    const usuario = { 
        id: Math.floor(Math.random() * 1000),
        name: nombre,
        apellido: apellido
    };
    usuarios.push(usuario);
    res.status(201).json({ message: "Usuario creado", usuario: usuario });
});

/* ----------------------------------------------- PATCH -------------------------------------------------------*/
app.patch("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === id);
    if(!usuario){
        res.status(404).json({ message: "Usuario no encontrado" });
        return;
    }
    const nombre = req.body.nombre; // Suponiendo que el cliente envía un JSON con un campo "nombre"
    const apellido = req.body.apellido; // Suponiendo que el cliente envía un JSON con un campo "apellido"
    if(nombre){
        usuario.name = nombre;
    }
    if(apellido){
        usuario.apellido = apellido;
    }
    res.status(200).json({ message: "Usuario actualizado", usuario: usuario });
})
/* ----------------------------------------------- PUT -------------------------------------------------------*/
app.put("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === id);
    if(!usuario){
        res.status(404).json({ message: "Usuario no encontrado" });
        return;
    }
    const nombre = req.body.nombre; // Suponiendo que el cliente envía un JSON con un campo "nombre"
    const apellido = req.body.apellido; // Suponiendo que el cliente envía un JSON con un campo "apellido"
    if(!nombre || !apellido){
        res.status(400).json({ message: "Faltan campos obligatorios" });
        return;
    }
    usuario.name = nombre;
    usuario.apellido = apellido;
    res.status(200).json({ message: "Usuario actualizado", usuario: usuario });

});

/* ----------------------------------------------- DELETE -------------------------------------------------------*/
app.delete("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const usuarioIndex = usuarios.findIndex(u => u.id === id);
    if(usuarioIndex === -1){
        res.status(404).json({ message: "Usuario no encontrado" });
        return;
    }
    const usuario = usuarios[usuarioIndex];
    usuarios = usuarios.filter(u => u.id !== id);
    res.status(200).json({ message: "Usuario eliminado", usuario: usuario });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
