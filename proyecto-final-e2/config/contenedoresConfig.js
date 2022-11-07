const path = require("path");

// contenedore de archivo
const productosContenedorArchivo = path.join(__dirname, "../db/productos.txt");
const carritosContenedorArchivo = path.join(__dirname, "../db/carritos.txt");

// firebase
const firebaseServiceAccount = require(path.join(
  __dirname,
  "./fireBaseKey.json"
));

// MongoDB
// local
//const mongoDBURL = "mongodb://127.0.0.1:27017/ecommerce"
//  atlas
const mongoDBURL = "mongodb+srv://user:password@cluster0.ia133vo.mongodb.net/ecommerce"
const mongoDBProductosModel = path.join(__dirname, "../src/models/productosModel.js");
const mongoDBCarritosModel = path.join(__dirname, "../src/models/carritosModel.js");

// MySQL
const MySQLConnectionInfo = {
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "",
  database: "ecommerce",
};
const SQLProductosTable = "productos";
const SQLCarritosTable = "carritos";

// Sqlite3
const Sqlite3Database = path.join(__dirname, "../db/ecommerce.sqlite");

module.exports = {
  carritosContenedorArchivo,
  productosContenedorArchivo,
  firebaseServiceAccount,
  mongoDBURL,
  mongoDBProductosModel,
  mongoDBCarritosModel,
  MySQLConnectionInfo,
  SQLProductosTable,
  SQLCarritosTable,
  Sqlite3Database,
};
