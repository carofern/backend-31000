const { ContenedorMongoDB } = require("../../contenedores/ContenedorMongoDB");
const {
  mongoDBURL,
  mongoDBProductosModel,
} = require("../../../config/contenedoresConfig");

class ProductosDAOMongoDB extends ContenedorMongoDB {
  constructor() {
    const model = require(mongoDBProductosModel);
    super(mongoDBURL, model);
  }
}

module.exports = { ProductosDAOMongoDB };
