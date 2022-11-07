const { ContenedorProductos } = require("../classes/contenedorProductos");

let productos = new ContenedorProductos(__dirname + "/productos.txt");

module.exports = { productos };
