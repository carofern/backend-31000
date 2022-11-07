const ContenedorMongoDB = require("../containers/ContenedorMongoDB");
const { usuariosModel } = require("../models/index");
const { mongoUrl } = require("../config/config");

class UsuariosDao extends ContenedorMongoDB {
  constructor() {
    super(mongoUrl, usuariosModel);
  }

  async desconectar() {}
}

const usuariosDao = new UsuariosDao();

module.exports = usuariosDao;
