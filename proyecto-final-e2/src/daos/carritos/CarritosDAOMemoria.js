const path = require("path");
const { ContenedorMemoria } = require("../../contenedores/ContenedorMemoria");

class CarritosDAOMemoria extends ContenedorMemoria {
  constructor() {
    super();
  }
}

module.exports = { CarritosDAOMemoria };