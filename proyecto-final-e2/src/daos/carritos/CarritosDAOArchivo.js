const path = require("path");
const { ContenedorArchivo } = require("../../contenedores/ContenedorArchivo");
const { carritosContenedorArchivo } = require("../../../config/contenedoresConfig");

class CarritosDAOArchivo extends ContenedorArchivo {
  constructor() {
    super(carritosContenedorArchivo);
  }
}

module.exports = { CarritosDAOArchivo };