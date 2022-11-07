const util = require("util");
const random = require("random");
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

function buildRandomNumberList(count) {
  const numeros = [];
  for (let i = 1; i <= 1000; i++) {
    numeros[i] = 0;
  }
  for (let i = 1; i <= count; i++) {
    const numeroAleatorio = random.int(1, 1000);
    numeros[numeroAleatorio]++;
  }
  numeros.splice(0, 1);
  return numeros.map((element, idx) => ({ [idx + 1]: element }));
}

module.exports = { normalizar, cloneObj, printObj, buildErrorMessage, buildRandomNumberList };
