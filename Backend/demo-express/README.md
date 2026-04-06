# demo-express

Proyecto demo para aprender la estructura básica de un servidor backend con **Node.js** y **Express**. Implementa una API REST completa con las cinco operaciones CRUD sobre un recurso `usuarios`.

## Instalación

```bash
npm install
npm run dev
```

El servidor corre en `http://localhost:3000`.

---

## Conceptos básicos

### `require`
Importa módulos (librerías o archivos) en Node.js. Es el equivalente de `import` en otros lenguajes.

```js
const express = require('express'); // Importa la librería Express
const cors = require('cors');       // Importa la librería CORS
```

### Middlewares
Funciones que se ejecutan antes de que llegue la solicitud a la ruta. Se configuran con `app.use()`.

```js
app.use(express.json()); // Permite leer JSON en el cuerpo de las solicitudes (req.body)
app.use(cors());         // Permite solicitudes desde otros orígenes (ej. un frontend en otro puerto)
```

### `req` y `res`
Cada ruta recibe dos parámetros:
- `req` (request): información que el **cliente envía** al servidor (parámetros, cuerpo, headers, etc.)
- `res` (response): objeto para **enviar la respuesta** al cliente

```js
app.get("/", (req, res) => {
    res.send("Hello World!"); // Envía texto plano
});
```

---

## Métodos HTTP

### GET
Se usa para **obtener** datos. No modifica nada en el servidor.

```js
// Lista todos los usuarios
app.get("/usuarios", (req, res) => {
    res.json({ data: usuarios });
});

// Obtiene un usuario por ID (req.params.id llega como string, hay que convertirlo)
app.get("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "ID inválido" });
        return;
    }
    const usuario = usuarios.find(u => u.id === id);
    if (usuario) {
        res.status(200).json({ message: "Usuario encontrado", data: usuario });
    } else {
        res.status(404).json({ message: "Usuario no encontrado" });
    }
});
```

### POST
Se usa para **crear** un nuevo recurso. Los datos llegan en `req.body`.

```js
app.post("/usuarios", (req, res) => {
    const usuario = {
        id: Math.floor(Math.random() * 1000),
        name: req.body.nombre,
        apellido: req.body.apellido
    };
    usuarios.push(usuario);
    res.status(201).json({ message: "Usuario creado", usuario: usuario });
});
```

> `res.status(201)` indica que el recurso fue creado exitosamente (HTTP 201 Created).

### PATCH
Se usa para **actualizar parcialmente** un recurso. Solo se modifican los campos que llegan en el `body`; los demás conservan su valor.

```js
app.patch("/usuarios/:id", (req, res) => {
    const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    if (!usuario) {
        res.status(404).json({ message: "Usuario no encontrado" });
        return;
    }
    if (req.body.nombre)   usuario.name = req.body.nombre;
    if (req.body.apellido) usuario.apellido = req.body.apellido;
    res.status(200).json({ message: "Usuario actualizado", usuario: usuario });
});
```

### PUT
Se usa para **reemplazar completamente** un recurso. Todos los campos son obligatorios.

```js
app.put("/usuarios/:id", (req, res) => {
    const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    if (!usuario) {
        res.status(404).json({ message: "Usuario no encontrado" });
        return;
    }
    const { nombre, apellido } = req.body;
    if (!nombre || !apellido) {
        res.status(400).json({ message: "Faltan campos obligatorios" });
        return;
    }
    usuario.name = nombre;
    usuario.apellido = apellido;
    res.status(200).json({ message: "Usuario actualizado", usuario: usuario });
});
```

> Diferencia clave: `PATCH` modifica solo lo que se envía; `PUT` reemplaza todos los campos (los que no se envíen quedan vacíos).

### DELETE
Se usa para **eliminar** un recurso.

```js
app.delete("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const usuarioIndex = usuarios.findIndex(u => u.id === id);
    if (usuarioIndex === -1) {
        res.status(404).json({ message: "Usuario no encontrado" });
        return;
    }
    const usuario = usuarios[usuarioIndex];
    usuarios = usuarios.filter(u => u.id !== id);
    res.status(200).json({ message: "Usuario eliminado", usuario: usuario });
});
```

---

## Endpoints disponibles

| Método   | Ruta             | Descripción                              | Respuestas posibles   |
|----------|------------------|------------------------------------------|-----------------------|
| `GET`    | `/`              | Saludo de prueba                         | `200`                 |
| `GET`    | `/usuarios`      | Retorna la lista de todos los usuarios   | `200`                 |
| `GET`    | `/usuarios/:id`  | Retorna un usuario por ID                | `200`, `400`, `404`   |
| `POST`   | `/usuarios`      | Crea un nuevo usuario                    | `201`                 |
| `PATCH`  | `/usuarios/:id`  | Actualiza campos específicos del usuario | `200`, `404`          |
| `PUT`    | `/usuarios/:id`  | Reemplaza completamente al usuario       | `200`, `400`, `404`   |
| `DELETE` | `/usuarios/:id`  | Elimina un usuario                       | `200`, `404`          |

---

## Ejemplos con curl

```bash
# Obtener todos los usuarios
curl http://localhost:3000/usuarios

# Obtener usuario con ID 1
curl http://localhost:3000/usuarios/1

# Crear un usuario
curl -X POST http://localhost:3000/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Diana", "apellido": "López"}'

# Actualizar solo el apellido (PATCH)
curl -X PATCH http://localhost:3000/usuarios/1 \
  -H "Content-Type: application/json" \
  -d '{"apellido": "Ramírez"}'

# Reemplazar completamente un usuario (PUT)
curl -X PUT http://localhost:3000/usuarios/1 \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Alice", "apellido": "Ramírez"}'

# Eliminar un usuario
curl -X DELETE http://localhost:3000/usuarios/1
```

---

## Stack

- [Node.js](https://nodejs.org/)
- [Express v5](https://expressjs.com/)
- [cors](https://www.npmjs.com/package/cors)
- [nodemon](https://nodemon.io/) (recarga automática en desarrollo)
