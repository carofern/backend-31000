const fs = require("fs");
const { options: optionsSqlite3 } = require("../options/sqlite3");
const { options: optionsMysql } = require("../options/mariadb");
const { databaseName, productsTableName, chatTableName } = require("./dbconst");

async function config() {
  optionsDatabase = JSON.parse(JSON.stringify(optionsMysql));
  delete optionsDatabase.connection.database;
  let knex = require("knex")(optionsDatabase);
  try {
    await knex.raw("CREATE DATABASE " + databaseName);
    console.log("Base de datos productos creada");
  } catch (error) {}
  knex.destroy();

  try {
    knex = require("knex")(optionsMysql);
    await knex.schema.dropTableIfExists(productsTableName);
    await knex.schema.createTable(productsTableName, (table) => {
      table.increments("id");
      table.string("title").notNullable();
      table.integer("price").notNullable();
      table.string("thumbnail").notNullable();
    });
    console.log("Tabla de productos creada");
    // insertar datos de prueba
    const productos = [
      {
        title: "Escuadra",
        price: 123.45,
        thumbnail:
          "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        id: 1,
      },
      {
        title: "Calculadora",
        price: 234.56,
        thumbnail:
          "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
        id: 2,
      },
      {
        title: "Globo Terraqueo",
        price: 345.67,
        thumbnail:
          "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        id: 3,
      },
    ];
    await knex("productos").insert(productos);
  } catch (error) {
    console.log("-- Error tabla productos --", error);
  }
  knex.destroy();
  // Borrar la base de sqlite si existe
  try {
    await fs.unlink(optionsSqlite3.connection.filename, (err) => {
      if (err && err.code != "ENOENT") {
        console.log("Error borrando base sqlite", err);
      }
    });
  } catch (error) {
    console.log(error);
  }
  knex = require("knex")(optionsSqlite3);
  try {
    await knex.schema.createTable(chatTableName, (table) => {
      table.increments("id");
      table.string("email").notNullable();
      table.timestamp("fechahora").notNullable().defaultTo(knex.fn.now());
      table.integer("mensaje").notNullable();
    });
    console.log("Tabla de chat creada");
    // insertar datos de prueba
    const chat = [
      {
        email: "manumartinez@mail.com",
        fechahora: "17/6/2022, 15:15:40",
        mensaje: "Hola a todos",
        id: 1,
      },
      {
        email: "ramalopez@outlook.com",
        fechahora: "17/6/2022, 15:16:40",
        mensaje: "Hola Manu como va",
        id: 2,
      },
      {
        email: "mairaperez@gmail.com",
        fechahora: "17/6/2022, 15:20:40",
        mensaje: "Hola Manu",
        id: 3,
      },
      {
        email: "mairaperez@gmail.com",
        fechahora: "17/6/2022, 15:20:45",
        mensaje: "Hola Rama",
        id: 4,
      },
    ];
    await knex("chat").insert(chat);
  } catch (error) {
    console.log("-- Error tabla chat --", error);
  }
  knex.destroy();
}

config();
