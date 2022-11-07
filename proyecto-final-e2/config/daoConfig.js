const {
  DAO_ARCHIVOS,
  DAO_FIREBASE,
  DAO_MEMORIA,
  DAO_MONGODB,
  DAO_MYSQL,
  DAO_SQLITE3,
} = require("./daoConst");

// Aqui se define que dao se utiliza tanto para carritos como para productos
const dao_carritos = DAO_FIREBASE;
const dao_productos = DAO_MONGODB;

module.exports = {
  dao_carritos,
  dao_productos,
};
