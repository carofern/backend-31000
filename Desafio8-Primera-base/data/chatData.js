const { ContenedorChat } = require("../classes/contenedorChat");
const { options } = require("../options/sqlite3");
const knex = require("knex")(options);
const { chatTableName } = require("../db/dbconst");

let chat = new ContenedorChat(knex, chatTableName);

module.exports = { chat };
