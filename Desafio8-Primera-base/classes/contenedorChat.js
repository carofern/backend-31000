const fs = require("fs");
const { Contenedor } = require("./contenedor");
const { validEmailRegex } = require("../public/assets/scripts/const");
const encoding = "utf8";

// Formato de chat esperado
// [
// 	{
// 		"email": "manumartinez@mail.com",
// 		"fechahora": "17/6/2022, 15:15:40",
// 		"mensaje": "Hola a todos"
// 	}, ...
// ]

// Clase contenedora de chat
class ContenedorChat extends Contenedor {
  constructor(knex, tableName) {
    super(knex, tableName);
  }
  // valida y agrega un nuevo mensaje
  // retorna el id del nuevo mensaje
  save(chatEntry) {
    // valido el mensaje
    let error = this.validaChatEntry(chatEntry);
    if (error != "") {
      throw new Error(error);
    }
    // eliminar espacios de mas en el mail
    chatEntry.email = chatEntry.email.trim();
    // fijar fecha y hora
    chatEntry.fechahora = new Date().toLocaleString();
    // eliminar espacios de mas en el mensaje
    chatEntry.mensaje = chatEntry.mensaje.trim();
    return super.save(chatEntry);
  }
  // Verifica que el objeto cahtEntry tenga las claves esperadas y que sean del tipo esperados
  validaChatEntry(chatEntry) {
    // validaciones de email
    if (!chatEntry.hasOwnProperty("email")) {
      return "El chatEntry no tiene una clave email";
    }
    if (typeof chatEntry.email !== "string") {
      return "La clave email debe ser un string";
    }
    if (chatEntry.email.trim() == "") {
      return "La clave email no puede estar vacía";
    }
    if (!validEmailRegex.test(chatEntry.email)) {
      return "El email no es valido";
    }
    // validaciones de mensaje
    if (!chatEntry.hasOwnProperty("mensaje")) {
      return "El chatEntry no tiene una clave mensaje";
    }
    if (typeof chatEntry.mensaje !== "string") {
      return "La clave mensaje debe ser un string";
    }
    if (chatEntry.mensaje.trim() == "") {
      return "La clave mensaje no puede estar vacía";
    }
    return "";
  }
}

module.exports = { ContenedorChat };
