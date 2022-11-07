const { ContenedorChat } = require("../classes/contenedorChat");

let chat = new ContenedorChat(__dirname + "/chat.txt");

module.exports = { chat };
