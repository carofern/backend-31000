const { ContenedorMongoDB } = require("../contenedores/ContenedorMongoDB");
const { mongoDBURL, mongoDBUsuariosModel } = require("../config");

class UsuariosDAOMongoDB extends ContenedorMongoDB {
  constructor() {
    const model = require(mongoDBUsuariosModel);
    super(mongoDBURL, model);
  }
}

const usuariosDAO = new UsuariosDAOMongoDB();

module.exports = { usuariosDAO };
