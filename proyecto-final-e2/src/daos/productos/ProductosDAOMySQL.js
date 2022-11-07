const path = require("path");
const { ContenedorMySQL } = require("../../contenedores/ContenedorMySQL");
const {
  MySQLConnectionInfo,
  SQLProductosTable,
} = require("../../../config/contenedoresConfig");

class ProductosDAOMySQL extends ContenedorMySQL {
  constructor() {
    super(MySQLConnectionInfo, SQLProductosTable);
  }
}

module.exports = { ProductosDAOMySQL };