# demo-express

Proyecto demo para aprender la estructura básica de un servidor backend con **Node.js** y **Express**.

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
app.get("/usuarios", (req, res) => {
    res.json({ usuarios: usuarios }); // Responde con JSON
});
```

### POST
Se usa para **crear** un nuevo recurso. Los datos llegan en `req.body`.

```js
app.post("/usuarios", (req, res) => {
    const nombre = req.body.nombre;
    const usuario = { id: Math.floor(Math.random() * 1000), name: nombre };
    usuarios.push(usuario);
    res.status(201).json({ message: "Usuario creado", usuario: usuario });
});
```

> `res.status(201)` indica que el recurso fue creado exitosamente (HTTP 201 Created).

---

## Endpoints disponibles

| Método | Ruta        | Descripción                        |
|--------|-------------|------------------------------------|
| GET    | `/`         | Saludo de prueba                   |
| GET    | `/usuarios` | Retorna la lista de usuarios       |
| POST   | `/usuarios` | Crea un nuevo usuario              |

### Ejemplo POST con curl

```bash
curl -X POST http://localhost:3000/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Diana"}'
```

---

## Stack

- [Node.js](https://nodejs.org/)
- [Express v5](https://expressjs.com/)
- [cors](https://www.npmjs.com/package/cors)
- [nodemon](https://nodemon.io/) (recarga automática en desarrollo)
