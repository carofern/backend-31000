const { ContenedorMongoDB } = require("../contenedores/ContenedorMongoDB");
const { mongoDBURL, mongoDBProductosModel } = require("../config");

class ProductosDAOMongoDB extends ContenedorMongoDB {
  constructor() {
    const model = require(mongoDBProductosModel);
    super(mongoDBURL, model);
  }
}

let productosDAO = new ProductosDAOMongoDB();

module.exports = { productosDAO };
