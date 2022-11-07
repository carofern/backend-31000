const { normalize, schema } = require("normalizr");

function normalizar(mensajes) {
  const authorSchema = new schema.Entity("authors", {}, { idAttribute: "email" });
  const messageSchema = new schema.Entity("message", { author: authorSchema });
  const messagesSchema = [messageSchema];
  return normalize(mensajes, messagesSchema);
}

module.exports = { normalizar };
