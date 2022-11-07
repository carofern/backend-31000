// Clase contenedora generica
class ContenedorKnex {
  constructor(connectionOptions, tableName, returnId = true) {
    // Crea una instancia de knex
    this.knex = require("knex")(connectionOptions);
    this.tabla = tableName;
    this.returnId = returnId;
  }
  // agrega un nuevo item en la tabla
  // retorna el id del nuevo producto
  async save(newItem) {
    let rid = [];
    if (this.returnId) {
      const rid = ["id"];
    }
    let id = await this.knex(this.tabla).insert(newItem, rid);
    if (Array.isArray(id)) {
      id = id[0];
    }
    return id;
  }
  // retorna el item indicado por idBuscado o null si no existe
  async getById(idBuscado) {
    const rows = await this.knex.from(this.tabla).select("*").where("id", idBuscado);
    if (rows.length > 0) {
      return rows[0];
    }
    return null;
  }
  // devuelve la lista completa de items
  async getAll() {
    const rows = await this.knex.from(this.tabla).select("*");
    const result = [];
    for (const row of rows) {
      result.push({ ...row });
    }
    return result;
  }
  // elimina el item del id indicado
  async deleteById(idBuscado) {
    const rows = await this.knex.from(this.tabla).select("*").where("id", idBuscado);
    if (rows.length > 0) {
      await this.knex.from(this.tabla).del().where("id", idBuscado);
      return { ...rows[0] };
    } else {
      return null;
    }
  }
  // borrar todos los productos
  async deleteAll() {
    await this.knex.from(this.tabla).del();
  }
  // retorna el producto actualizado indicado por idBuscado o null si no existe
  async updateById(idBuscado, itemActualizado) {
    let rows = await this.knex.from(this.tabla).select("*").where("id", idBuscado);
    if (rows.length > 0) {
      await this.knex.from(this.tabla).where("id", idBuscado).update(itemActualizado);
      rows = await this.knex.from(this.tabla).select("*").where("id", idBuscado);
      return { ...rows[0] };
    } else {
      return null;
    }
  }
  async disconnect() {
    this.knex.destroy();
  }
}

module.exports = { ContenedorKnex };
