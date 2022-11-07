const ContenedorMongoDB = require("../containers/ContenedorMongoDB");
const { productosModel } = require("../models/index");
const { mongoUrl } = require("../config/config");

class ProductosDao extends ContenedorMongoDB {
  constructor() {
    super(mongoUrl, productosModel);
  }

  async desconectar() {}
}

const productosDao = new ProductosDao();

module.exports = productosDao;
