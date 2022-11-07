const { ContenedorMongoDB } = require("../contenedores/ContenedorMongoDB");
const usuariosModel = require("../models/usuariosModel");
const { mongoUrl } = require("../config");

class UsuariosDao extends ContenedorMongoDB {
  constructor() {
    super(mongoUrl, usuariosModel);
  }

  async desconectar() {}
}

const usuarios = new UsuariosDao();

module.exports = { usuarios };
