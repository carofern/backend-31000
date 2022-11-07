const { productos } = require("./daos/ProductosDAO");
const { chat } = require("./daos/ChatDAO");
const { normalizar } = require("./util");
const { io } = require("./global");

function socketConfig() {
  io.on("connection", async (socket) => {
    console.log("Nuevo cliente: ", socket.id, socket.handshake.address);

    // devolver la lista actual de productos
    socket.emit("productos", await productos.getAll());

    // carga inicial de mensajes
    const chatMessages = await chat.getAll();
    const normalized = await normalizar(chatMessages);
    socket.emit("mensajes", normalized);

    // actualizacion de mensajes
    socket.on("mensaje", async (mensaje) => {
      try {
        mensaje.fechahora = new Date().toLocaleString();
        await chat.save(mensaje);
      } catch (error) {
        console.log("Error guardando mensaje de chat=", error);
      }
      const chatMessages = await chat.getAll();
      const normalized = await normalizar(chatMessages);
      io.sockets.emit("mensajes", normalized);
    });
  });
}

module.exports = { socketConfig };
