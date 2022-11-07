const { ContenedorFirebase } = require("../../contenedores/ContenedorFirebase");
const { firebaseServiceAccount } = require("../../../config/contenedoresConfig");

class ProductosDAOFirebase extends ContenedorFirebase {
  constructor() {
    super(firebaseServiceAccount, "productos");
  }
}

module.exports = { ProductosDAOFirebase };
