const productosDao = require("../daos/chatDao");

async function getAllMessages() {
  return await productosDao.getAll();
}

async function addNewMessage(mensaje) {
  if (typeof mensaje.author.email !== "string") throw "Email must be string";
  if (typeof mensaje.author.nombre !== "string") throw "Nombre must be string";
  if (typeof mensaje.author.apellido !== "string") throw "Apellido must be string";
  if (typeof mensaje.author.edad !== "number") throw "Edad must be number";
  if (typeof mensaje.author.alias !== "string") throw "Alias must be string";
  if (typeof mensaje.author.avatar !== "string") throw "Avatar must be string";
  if (typeof mensaje.text !== "string") throw "Text must be string";

  mensaje.fechahora = new Date().toLocaleString();
  await productosDao.save(mensaje);
}

module.exports = { getAllMessages, addNewMessage };
