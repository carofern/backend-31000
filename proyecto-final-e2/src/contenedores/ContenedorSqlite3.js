const { ContenedorKnex } = require("./ContenedorKnex");

// Clase contenedora de SQLite3
class ContenedorSQLite3 extends ContenedorKnex {
  constructor(tableName, databaseFile) {
    const options = {
      client: "sqlite3",
      connection: {
        filename: databaseFile,
      },
      useNullAsDefault: true,
    };

    super(options, tableName, false);
    this.options = options;
  }
  async save(newItem) {
    await super.save(newItem);
    const result = await this.knex.raw("SELECT last_insert_rowid()");
    const obj = result[0];
    const id = obj[Object.keys(obj)[0]];
    return id;
  }
}

module.exports = { ContenedorSQLite3 };
