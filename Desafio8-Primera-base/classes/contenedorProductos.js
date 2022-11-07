const fs = require("fs");
const { Contenedor } = require("./contenedor");
const { validUrlRegex } = require("../public/assets/scripts/const");
const encoding = "utf8";

// Formato de producto esperado
// [
// 	{
// 		"title": "Escuadra",
// 		"price": 123.45,
// 		"thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
// 		"id": 1
// 	}, ...
// ]

// Clase contenedora de productos
class ContenedorProductos extends Contenedor {
  constructor(knex, tableName) {
    super(knex, tableName);
  }
  // valida y agrega un nuevo producto
  // retorna el id del nuevo producto
  save(producto) {
    // valido el producto
    let error = this.validaProducto(producto);
    if (error != "") {
      throw new Error(error);
    }
    // eliminar espacios de mas en el titulo
    producto.title = producto.title.trim();
    // forzar precio a numero
    producto.price = +producto.price;
    // eliminar espacios de mas en el thumbnail
    producto.thumbnail = producto.thumbnail.trim();
    return super.save(producto);
  }
  // retorna el producto actualizado indicado por idBuscado o null si no existe
  updateById(idBuscado, productoActualizado) {
    // valido el producto
    let error = this.validaProducto(producto);
    if (error != "") {
      throw new Error(error);
    }
    return super.updateById(idBuscado, productoActualizado);
  }
  // Verifica que el objeto producto tenga las claves esperadas y que sean del tipo esperados
  validaProducto(producto) {
    // validaciones de tittle
    if (!producto.hasOwnProperty("title")) {
      return "El producto no tiene una clave title";
    }
    if (typeof producto.title !== "string") {
      return "La clave tittle debe ser un string";
    }
    if (producto.title.trim() == "") {
      return "La clave tittle no puede estar vacía";
    }
    // validaciones de price
    if (!producto.hasOwnProperty("price")) {
      return "El producto no tiene una clave price";
    }
    if (isNaN(producto.price)) {
      return "La clave price debe ser un numero";
    }
    if (producto.price <= 0) {
      return "El precio debe ser mayor a 0";
    }
    // validaciones de thumbnail
    if (!producto.hasOwnProperty("thumbnail")) {
      return "El producto no tiene una clave thumbnail";
    }
    if (typeof producto.thumbnail !== "string") {
      return "La clave tittle debe ser un string";
    }
    if (producto.thumbnail.trim() == "") {
      return "La clave thumbnail no puede estar vacía";
    }
    if (!validUrlRegex.test(producto.thumbnail)) {
      return "La clave thumbnail no contiene una URL valida";
    }
    return "";
  }
}

module.exports = { ContenedorProductos };
