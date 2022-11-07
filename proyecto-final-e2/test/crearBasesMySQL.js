const { SQLProductosTable, SQLCarritosTable, MySQLConnectionInfo } = require("../config/contenedoresConfig");
const mysqlOptions = {
  client: "mysql",
  connection: MySQLConnectionInfo,
  pool: { min: 0, max: 7 },
};

async function config() {
  knex = require("knex")(mysqlOptions);
  try {
    const exists = await knex.schema.dropTableIfExists(SQLProductosTable);
    await knex.schema.createTable(SQLProductosTable, (table) => {
      table.increments("id");
      table.timestamp("timestamp").notNullable().defaultTo(knex.fn.now());
      table.string("nombre").notNullable();
      table.string("descripcion").notNullable();
      table.string("codigo").notNullable();
      table.string("foto").notNullable();
      table.float("precio").notNullable();
      table.integer("stock").notNullable();
    });
    console.log("Tabla "+SQLProductosTable+" creada");
  } catch (error) {
    console.log(`-- Error tabla ${SQLProductosTable} --`, error);
  }
  try {
    const exists = await knex.schema.dropTableIfExists(SQLCarritosTable);
    await knex.schema.createTable(SQLCarritosTable, (table) => {
      table.increments("id");
      table.timestamp("timestamp").notNullable().defaultTo(knex.fn.now());
      table.string("productos", 4096).notNullable();
    });
    console.log("Tabla "+SQLCarritosTable+" creada");
  } catch (error) {
    console.log(`-- Error tabla ${SQLCarritosTable} --`, error);
  }

  knex.destroy();
}

config();
