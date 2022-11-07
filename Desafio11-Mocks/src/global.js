const express = require("express");
const { Server: Socket } = require("socket.io");
const app = express();
const PORT = 8080;

// creo el servidor de Express en el puerto indicado
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

// loguear cualquier error a consola
server.on("error", (error) => console.log(`Error en servidor ${error}`));

// creo el socket
io = new Socket(server);

module.exports = { app, io };
