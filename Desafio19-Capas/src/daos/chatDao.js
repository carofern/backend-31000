const ContenedorMongoDB = require("../containers/ContenedorMongoDB");
const { chatModel } = require("../models/index");
const { mongoUrl } = require("../config/config");

class ChatDao extends ContenedorMongoDB {
  constructor() {
    super(mongoUrl, chatModel);
  }

  async desconectar() {}
}

const chatDao = new ChatDao();

module.exports = chatDao;
