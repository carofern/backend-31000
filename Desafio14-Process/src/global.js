const morgan = require("morgan");
const express = require("express");
const { Server: Socket } = require("socket.io");
const app = express();
const yargs = require("yargs/yargs");

const args = yargs(process.argv.slice(2))
  .default({
    puerto: 8080,
  })
  .alias({
    p: "puerto",
  }).argv;

// creo el servidor de Express en el puerto indicado
const server = app.listen(args.puerto, () => {
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
