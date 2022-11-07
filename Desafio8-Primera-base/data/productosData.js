const { ContenedorProductos } = require("../classes/contenedorProductos");
const { options } = require("../options/mariadb");
const knex = require("knex")(options);
const { productsTableName } = require("../db/dbconst");

let productos = new ContenedorProductos(knex, productsTableName);

module.exports = { productos };
