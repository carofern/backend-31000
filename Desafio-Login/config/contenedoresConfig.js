const path = require("path");

// contenedores de archivo
const productosContenedorArchivo = path.join(__dirname, "../db/productos.txt");
const chatContenedorArchivo = path.join(__dirname, "../db/chat.txt");
const MONGO_USER = "ch12";
const MONGO_PW = "to4f8e5pssBL71fZ";
const MONGO_URL = `mongodb+srv://${MONGO_USER}:${MONGO_PW}@cluster0.ia133vo.mongodb.net/ch12`;

module.exports = {
  productosContenedorArchivo,
  chatContenedorArchivo,
  MONGO_URL,
};
