const logger = require("../logger");
const { cloneObj } = require("../util");
const ObjectId = require("mongoose").Types.ObjectId;

async function connect(mongoose, url) {
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

function isValidObjectId(Id) {
  const oid = new ObjectId(Id);
  const newId = oid._id + "";
  if (newId === Id) return true;
  return false;
}

function formatItem(Obj) {
  if (Obj) {
    Obj.id = Obj._id;
    delete Obj._id;
    delete Obj.__v;
  }
  return Obj;
}

// Clase contenedora MongoDB
class ContenedorMongoDB {
  constructor(MongoURL, model) {
    this.model = model;
    this.mongoose = require("mongoose");
    connect(this.mongoose, MongoURL);
  }

  // agrega un nuevo item
  async save(newItem) {
    newItem.timestamp = +new Date();
    const productoSaveModel = new this.model(newItem);
    const productoSave = await productoSaveModel.save();
    return productoSave.id;
  }

  // retorna el item indicado por idBuscado o null si no existe
  async getById(idBuscado) {
    if (isValidObjectId(idBuscado)) {
      return formatItem(cloneObj(await this.model.findById(idBuscado)));
    }
    return null;
  }

  // busca un item por el campo indicado
  async find(findObj) {
    const result = await this.model.find(findObj);
    if (result.length > 0) {
      return formatItem(cloneObj(result[0]));
    }
    return null;
  }

  // devuelve la lista completa de items
  async getAll() {
    let result = await this.model.find({});
    const list = cloneObj(result);
    list.map((element) => {
      return formatItem(element);
    });
    return list;
  }

  // elimina el item del id indicado
  async deleteById(idBuscado) {
    if (isValidObjectId(idBuscado)) {
      let item = await this.model.findById(idBuscado);
      if (item) {
        item = formatItem(cloneObj(item));
        await this.model.deleteOne({ _id: item.id });
        return item;
      }
    }
    return null;
  }

  // elimina todos los items
  async deleteAll() {
    await this.model.deleteMany({});
  }

  // retorna el producto actualizado indicado por idBuscado o null si no existe
  async updateById(idBuscado, itemActualizado) {
    if (isValidObjectId(idBuscado)) {
      const item = await this.model.findById(idBuscado);
      if (item) {
        delete itemActualizado.id;
        delete itemActualizado.__v;
        delete itemActualizado._id;
        await this.model.updateOne({ _id: idBuscado }, { $set: itemActualizado });
        const item = await this.model.findById(idBuscado);
        return item;
      }
    }
    return null;
  }
  async disconnect() {
    this.mongoose.disconnect();
  }
}

module.exports = { ContenedorMongoDB };
