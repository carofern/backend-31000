const path = require("path");
const { ContenedorArchivo } = require("../contenedores/ContenedorArchivo");
const { productosContenedorArchivo } = require("../../config/contenedoresConfig");

class ProductosDao extends ContenedorArchivo {
  constructor() {
    super(productosContenedorArchivo);
  }

  async desconectar() {}
}

const productos = new ProductosDao();

module.exports = { productos };