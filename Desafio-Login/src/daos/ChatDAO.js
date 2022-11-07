const path = require("path");
const { ContenedorArchivo } = require("../contenedores/ContenedorArchivo");
const { chatContenedorArchivo } = require("../../config/contenedoresConfig");

class ChatDao extends ContenedorArchivo {
  constructor() {
    super(chatContenedorArchivo);
  }

  async desconectar() {}
}

const chat = new ChatDao();

module.exports = { chat };