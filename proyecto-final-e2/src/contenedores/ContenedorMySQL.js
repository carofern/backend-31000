const { ContenedorKnex } = require("./ContenedorKnex");

// Clase contenedora de MySQL
class ContenedorMySQL extends ContenedorKnex {
  constructor(connectionInfo, tableName) {
    const options = {
      client: "mysql",
      connection: connectionInfo,
      pool: { min: 0, max: 7 },
    };

    super(options, tableName);
  }
}

module.exports = { ContenedorMySQL };