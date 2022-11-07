const fs = require("fs");
const encoding = "utf8";

// Clase contenedora generica
class Contenedor {
  constructor(knex, tableName) {
    // Guarda la instancia de knex
    // y la tabla donde se van a
    // almacenar los datos
    this.knex = knex;
    this.tabla = tableName;
  }
  // agrega un nuevo item en la tabla
  // retorna el id del nuevo producto
  async save(newItem) {
    const id = await this.knex(this.tabla).insert(newItem, ["id"]);
    return id;
  }
  // retorna el item indicado por idBuscado o null si no existe
  async getById(idBuscado) {
    const rows = await this.knex
      .from(this.tabla)
      .select("*")
      .where("id", idBuscado);
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
      result.push({...row}); 
    }
    //console.log(result);
    return result;
  }
  // elimina el item del id indicado
  async deleteById(idBuscado) {
    const rows = await this.knex.from(this.tabla).select("*").where("id", idBuscado);
    if (rows.length > 0) {
      await knex.from(this.tabla).del().where("id", idBuscado);
      return {...rows[0]};
    } else {
      return null;
    }
  }
  // borrar todos los productos
  async deleteAll() {
    await knex.from(this.tabla).del();
  }
  // retorna el producto actualizado indicado por idBuscado o null si no existe
  async updateById(idBuscado, itemActualizado) {
    let rows = await this.knex.from(this.tabla).select("*").where("id", idBuscado);
    if (rows.length > 0) {
      await knex.from(this.tabla).where("id", idBuscado).update(itemActualizado);
      rows = await this.knex.from(this.tabla).select("*").where("id", idBuscado);
      return {...rows[0]};
    } else {
      return null;
    }
  }
}

module.exports = { Contenedor };