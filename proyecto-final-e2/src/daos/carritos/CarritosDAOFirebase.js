const { ContenedorFirebase } = require("../../contenedores/ContenedorFirebase");
const { firebaseServiceAccount } = require("../../../config/contenedoresConfig");

class CarritosDAOFirebase extends ContenedorFirebase {
  constructor() {
    super(firebaseServiceAccount, "carritos");
  }
}

module.exports = { CarritosDAOFirebase };
