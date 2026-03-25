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
app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.get("/usuarios", (req, res) => {
    res.json({ usuarios: usuarios });
});

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