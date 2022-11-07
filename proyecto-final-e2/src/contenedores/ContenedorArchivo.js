const fs = require("fs");
const encoding = "utf8";
const { cloneObj } = require("../util");

// Clase contenedora en archivo
class ContenedorArchivo {
  constructor(nombreArchivoContenedor) {
    // Guarda el nombre del archivo contenedor e inicializa
    // el contenido de listaItems con el contenido
    // del archivo
    this.nombreArchivo = nombreArchivoContenedor;
    this.listaItems = this.readFromFile();
  }
  // escribe listaItems en el archivo indicado por nombreArchivo
  async saveToFile() {
    try {
      await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify(this.listaItems),
        encoding
      );
    } catch (error) {
      throw error;
    }
  }
  // lee el contenido de nombreArchivo
  readFromFile() {
    try {
      return JSON.parse(fs.readFileSync(this.nombreArchivo));
    } catch (error) {
      // Hubo un error al leer el archivo,
      // asumo que no existe y retorno un arreglo vacío
      return [];
    }
  }
  // agrega un nuevo item a listaItems y graba en disco
  // retorna el id del nuevo producto
  async save(newItem) {
    // busco el id máximo actual y le sumo 1
    let id = 0;
    this.listaItems.forEach((element) => {
      if (element.id > id) id = element.id;
    });
    id++;
    // asigno el id en el objeto
    newItem.id = id;
    newItem.timestamp = + new Date();
    // agrego el objeto a la lista de items
    const itemToInsert = cloneObj(newItem);
    this.listaItems.push(itemToInsert);
    await this.saveToFile();
    return id;
  }
  // devuelve el índice en listaItems de idBuscado si existe
  indexOf(idBuscado) {
    for (let i = 0; i < this.listaItems.length; i++) {
      if (this.listaItems[i].id == idBuscado) return i;
    }
    return -1;
  }
  // retorna el item indicado por idBuscado o null si no existe
  async getById(idBuscado) {
    let index = this.indexOf(idBuscado);
    if (index >= 0) {
      return cloneObj(this.listaItems[index]);
    }
    return null;
  }
  // devuelve la lista completa de items
  async getAll() {
    return cloneObj(this.listaItems);
  }
  // elimina el item del id indicado
  async deleteById(idBuscado) {
    let index = this.indexOf(idBuscado);
    if (index >= 0) {
      // borro el elemento del arreglo
      let itemEliminado = this.listaItems[index];
      this.listaItems.splice(index, 1);
      // escribo el archivo (async)
      await this.saveToFile();
      return itemEliminado;
    } else {
      return null;
    }
  }
  async deleteAll() {
    this.listaItems = [];
    await this.saveToFile();
  }
  // retorna el producto actualizado indicado por idBuscado o null si no existe
  async updateById(idBuscado, itemActualizado) {
    let index = this.indexOf(idBuscado);
    if (index >= 0) {
      // actualizo el producto
      itemActualizado.id = this.listaItems[index].id;
      itemActualizado.timestamp = this.listaItems[index].timestamp;
      this.listaItems[index] = cloneObj(itemActualizado);
      await this.saveToFile();
      return itemActualizado;
    } else {
      return null;
    }
  }
  async disconnect() {}
}

module.exports = { ContenedorArchivo };
