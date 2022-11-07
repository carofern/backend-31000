const util = require("util");
const { normalize, schema } = require("normalizr");

function normalizar(mensajes) {
  const authorSchema = new schema.Entity("authors", {}, { idAttribute: "email" });
  const messageSchema = new schema.Entity("message", { author: authorSchema });
  const messagesSchema = [messageSchema];
  return normalize(mensajes, messagesSchema);
}

function cloneObj(objeto) {
  return JSON.parse(JSON.stringify(objeto));
}

function printObj(objeto) {
  console.log(util.inspect(objeto, false, 12, true));
}

// Crea un objeto con el error y la descripcion del error
function buildErrorMessage(error, descripcion) {
  return {
    error,
    descripcion,
  };
}

module.exports = { normalizar, cloneObj, printObj, buildErrorMessage };
