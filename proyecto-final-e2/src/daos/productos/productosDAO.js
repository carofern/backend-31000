const { dao_productos } = require("../../../config/daoConfig");
const {
  DAO_ARCHIVOS,
  DAO_FIREBASE,
  DAO_MEMORIA,
  DAO_MONGODB,
  DAO_MYSQL,
  DAO_SQLITE3,
} = require("../../../config/daoConst");

let productosDAO;

async function configDAO() {
  switch (dao_productos) {
    case DAO_ARCHIVOS:
      const { ProductosDAOArchivo } = await import("./ProductosDAOArchivo.js");
      productosDAO = new ProductosDAOArchivo();
      break;
    case DAO_FIREBASE:
      const { ProductosDAOFirebase } = await import(
        "./ProductosDAOFirebase.js"
      );
      productosDAO = new ProductosDAOFirebase();
      break;
    case DAO_MEMORIA:
      const { ProductosDAOMemoria } = await import("./ProductosDAOMemoria.js");
      productosDAO = new ProductosDAOMemoria();
      break;
    case DAO_MONGODB:
      const { ProductosDAOMongoDB } = await import("./ProductosDAOMongoDB.js");
      productosDAO = new ProductosDAOMongoDB();
      break;
    case DAO_MYSQL:
      const { ProductosDAOMySQL } = await import("./ProductosDAOMySQL.js");
      productosDAO = new ProductosDAOMySQL();
      break;
    case DAO_SQLITE3:
      const { ProductosDAOSQLite3 } = await import("./ProductosDAOSQLite3.js");
      productosDAO = new ProductosDAOSQLite3();
      break;
    default:
      break;
  }
}

async function getProductosDAO() {
  if (!productosDAO) {
    await configDAO();
  }
  return productosDAO;
}

module.exports = { getProductosDAO };
