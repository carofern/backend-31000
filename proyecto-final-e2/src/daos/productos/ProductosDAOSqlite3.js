const path = require("path");
const { ContenedorSQLite3 } = require("../../contenedores/ContenedorSqlite3");
const { SQLProductosTable, Sqlite3Database } = require("../../../config/contenedoresConfig");

class ProductosDAOSQLite3 extends ContenedorSQLite3 {
  constructor() {
    super(SQLProductosTable, Sqlite3Database);
  }

}

module.exports = { ProductosDAOSQLite3 };