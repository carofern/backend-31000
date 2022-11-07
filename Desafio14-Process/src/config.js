const path = require("path");
const dotenv = require("dotenv").config();

const mongoUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}`;

// contenedores de archivo
const productosContenedorArchivo = path.join(__dirname, "../db/productos.txt");
const chatContenedorArchivo = path.join(__dirname, "../db/chat.txt");
const usuariosContenedorArchivo = path.join(__dirname, "../db/usuarios.txt");

module.exports = {
  mongoUrl,
  productosContenedorArchivo,
  chatContenedorArchivo,
  usuariosContenedorArchivo,
};
