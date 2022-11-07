const { ContenedorMongoDB } = require("../../contenedores/ContenedorMongoDB");
const {
  mongoDBURL,
  mongoDBCarritosModel,
} = require("../../../config/contenedoresConfig");

class CarritosDAOMongoDB extends ContenedorMongoDB {
  constructor() {
    const model = require(mongoDBCarritosModel);
    super(mongoDBURL, model);
  }
}

module.exports = { CarritosDAOMongoDB };
