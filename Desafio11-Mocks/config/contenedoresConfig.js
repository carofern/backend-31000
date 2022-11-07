const path = require("path");

// contenedore de archivo
const productosContenedorArchivo = path.join(__dirname, "../db/productos.txt");
const chatContenedorArchivo = path.join(__dirname, "../db/chat.txt");

module.exports = {
  productosContenedorArchivo,
  chatContenedorArchivo,
};
