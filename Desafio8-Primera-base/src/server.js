const express = require("express");
const { productos } = require("../data/productosData");
const { chat } = require("../data/chatData");
let { app, io } = require("./global");

const path = require("path");
const rutas = require("../routes/productosRoutes");

// configuracion del servidor
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));
app.use("/", rutas);

// configuracion del socket
io.on("connection", async (socket) => {
  console.log("Nuevo cliente: ", socket.id, socket.handshake.address);

  // devolver la lista actual de productos
  socket.emit("productos", await productos.getAll());

  // carga inicial de mensajes
  socket.emit('mensajes', await chat.getAll());

  // actualizacion de mensajes
  socket.on('mensaje', async mensaje => {
    try {
      await chat.save(mensaje);   
    } catch (error) {
      console.log("Error guardando mensaje de chat=", error);
    }
    io.sockets.emit('mensajes', await chat.getAll());
  })
});
