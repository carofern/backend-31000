const { ContenedorMongoDB } = require("../contenedores/ContenedorMongoDB");
const chatModel = require("../models/chatModel.js");
const { mongoUrl } = require("../config");

class ChatDao extends ContenedorMongoDB {
  constructor() {
    super(mongoUrl, chatModel);
  }

  async desconectar() {}
}

const chat = new ChatDao();

module.exports = { chat };
