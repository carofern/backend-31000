const { ContenedorMongoDB } = require("../contenedores/ContenedorMongoDB");
const productosModel = require("../models/productosModel.js");
const { mongoUrl } = require("../config");

class ProductosDao extends ContenedorMongoDB {
  constructor() {
    super(mongoUrl, productosModel);
  }

  async desconectar() {}
}

const productos = new ProductosDao();

module.exports = { productos };
