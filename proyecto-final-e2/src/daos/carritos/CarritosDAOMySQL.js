const path = require("path");
const { ContenedorMySQL } = require("../../contenedores/ContenedorMySQL");
const { cloneObj } = require("../../util");
const {
  MySQLConnectionInfo,
  SQLCarritosTable,
} = require("../../../config/contenedoresConfig");

class CarritosDAOMySQL extends ContenedorMySQL {
  constructor() {
    super(MySQLConnectionInfo, SQLCarritosTable);
  }
  async save(newItem) {
    const modifiedNewItem = cloneObj(newItem);
    modifiedNewItem.productos = JSON.stringify(modifiedNewItem.productos);
    return await super.save(modifiedNewItem);
  }
  async getAll() {
    const result = await super.getAll();
    result.forEach((item) => {
      item.productos = JSON.parse(item.productos);
    });
    return result;
  }
  async getById(idBuscado) {
    const result = await super.getById(idBuscado);
    if (result) {
      result.productos = JSON.parse(result.productos);
    }
    return result;
  }
  async deleteById(idBuscado) {
    const result = await super.deleteById(idBuscado);
    if (result) {
      result.productos = JSON.parse(result.productos);
    }
    return result;
  }
  async updateById(idBuscado, itemActualizado) {
    const modifiedNewItem = cloneObj(itemActualizado);
    modifiedNewItem.productos = JSON.stringify(modifiedNewItem.productos);
    const updatedItem = await super.updateById(idBuscado, modifiedNewItem);
    if (updatedItem) {
      updatedItem.productos = JSON.parse(updatedItem.productos);
    }
    return updatedItem;
  }
}

module.exports = { CarritosDAOMySQL };
