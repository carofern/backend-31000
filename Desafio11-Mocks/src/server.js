const express = require("express");
const { productos } = require("./daos/ProductosDAO");
const { chat } = require("./daos/ChatDAO");
const { normalizar } = require("./util");
let { app, io } = require("./global");

const path = require("path");
const rutas = require("./routes/routes");

// configuracion del servidor
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));
app.use("/api", rutas);

// configuracion del socket
io.on("connection", async (socket) => {
  console.log("Nuevo cliente: ", socket.id, socket.handshake.address);

  // devolver la lista actual de productos
  socket.emit("productos", await productos.getAll());

  // carga inicial de mensajes
  socket.emit("mensajes", normalizar(await chat.getAll()));

  // actualizacion de mensajes
  socket.on("mensaje", async (mensaje) => {
    try {
      mensaje.fechahora = new Date().toLocaleString();
      await chat.save(mensaje);
    } catch (error) {
      console.log("Error guardando mensaje de chat=", error);
    }
    io.sockets.emit("mensajes", await normalizar(chat.getAll()));
  });
});
