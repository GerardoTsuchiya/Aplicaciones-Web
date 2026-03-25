const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

let usuarios = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" }
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
    const usuario = { 
        id: Math.floor(Math.random() * 1000),
        name: nombre 
    };
    usuarios.push(usuario);
    res.status(201).json({ message: "Usuario creado", usuario: usuario });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
