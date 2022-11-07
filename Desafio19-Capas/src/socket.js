const { productService, chatService } = require("./services/index");
const logger = require("./lib/logger");
const { normalizar } = require("./lib/util");
const { io } = require("./global");

function socketConfig() {
  io.on("connection", async (socket) => {
    // devolver la lista actual de productos
    socket.emit("productos", await productService.getAllProducts());

    // carga inicial de mensajes
    const chatMessages = await chatService.getAllMessages();
    const normalized = await normalizar(chatMessages);
    socket.emit("mensajes", normalized);

    // actualizacion de mensajes
    socket.on("mensaje", async (mensaje) => {
      try {
        await chatService.addNewMessage(mensaje);
      } catch (error) {
        logger.error("Error guardando mensaje de chat=", error);
      }
      const chatMessages = await chatService.getAllMessages();
      const normalized = await normalizar(chatMessages);
      io.sockets.emit("mensajes", normalized);
    });
  });
}

module.exports = { socketConfig };
