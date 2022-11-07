const {dao_carritos} = require("../../../config/daoConfig");
const {
  DAO_ARCHIVOS,
  DAO_FIREBASE,
  DAO_MEMORIA,
  DAO_MONGODB,
  DAO_MYSQL,
  DAO_SQLITE3,
} = require("../../../config/daoConst");

let carritosDAO;

async function configDAO() {
  switch (dao_carritos) {
    case DAO_ARCHIVOS:
      const { CarritosDAOArchivo } = await import("./CarritosDAOArchivo.js");
      carritosDAO = new CarritosDAOArchivo();
      break;
    case DAO_FIREBASE:
      const { CarritosDAOFirebase } = await import("./CarritosDAOFirebase.js");
      carritosDAO = new CarritosDAOFirebase();
      break;
    case DAO_MEMORIA:
      const { CarritosDAOMemoria } = await import("./CarritosDAOMemoria.js");
      carritosDAO = new CarritosDAOMemoria();
      break;
    case DAO_MONGODB:
      const { CarritosDAOMongoDB } = await import("./CarritosDAOMongoDB.js");
      carritosDAO = new CarritosDAOMongoDB();
      break;
    case DAO_MYSQL:
      const { CarritosDAOMySQL } = await import("./CarritosDAOMySQL.js");
      carritosDAO = new CarritosDAOMySQL();
      break;
    case DAO_SQLITE3:
      const { CarritosDAOSQLite3 } = await import("./CarritosDAOSQLite3.js");
      carritosDAO = new CarritosDAOSQLite3();
      break;
    default:
      break;
  }
}

async function getCarritosDAO() {
  if (!carritosDAO) {
    await configDAO();
  }
  return carritosDAO;
}

module.exports = { getCarritosDAO };