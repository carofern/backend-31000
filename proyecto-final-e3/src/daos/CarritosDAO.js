const { ContenedorMongoDB } = require("../contenedores/ContenedorMongoDB");
const { mongoDBURL, mongoDBCarritosModel } = require("../config");

class CarritosDAOMongoDB extends ContenedorMongoDB {
  constructor() {
    const model = require(mongoDBCarritosModel);
    super(mongoDBURL, model);
  }
}

let carritosDAO = new CarritosDAOMongoDB();

module.exports = { carritosDAO };
