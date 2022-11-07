const path = require("path");
const { ContenedorArchivo } = require("../../contenedores/ContenedorArchivo");
const { productosContenedorArchivo } = require("../../../config/contenedoresConfig");

class ProductosDAOArchivo extends ContenedorArchivo {
  constructor() {
    super(productosContenedorArchivo);
  }
}

module.exports = { ProductosDAOArchivo };