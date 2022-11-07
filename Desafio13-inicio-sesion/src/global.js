const dotenv = require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const { Server: Socket } = require("socket.io");
const app = express();

// creo el servidor de Express en el puerto indicado
const server = app.listen(process.env.PORT || 8080, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

// loguear cualquier error a consola
server.on("error", (error) => console.log(`Error en servidor ${error}`));

// creo el socket
io = new Socket(server);

// configuracion del servidor
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

module.exports = { app, io };
